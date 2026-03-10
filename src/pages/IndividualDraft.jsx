import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllCards, generateDraftChoices } from '../services/cardService';
import CardDisplay from '../components/CardDisplay';
import DeckView from '../components/DeckView';
import PlayerIndicator from '../components/PlayerIndicator';

const DECK_SIZE = 12;
const CHOICES_COUNT = 3;

export default function IndividualDraft() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [choices, setChoices] = useState([]);
  const [picking, setPicking] = useState(false);

  const generateNewChoices = useCallback((cards) => {
    setChoices(generateDraftChoices(cards, CHOICES_COUNT));
  }, []);

  useEffect(() => {
    async function init() {
      try {
        const cards = await fetchAllCards();
        setAllCards(cards);
        generateNewChoices(cards);
      } catch (e) {
        setError('Failed to load cards. Please refresh.');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [generateNewChoices]);

  const isComplete = player1Deck.length >= DECK_SIZE && player2Deck.length >= DECK_SIZE;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate('/results', {
          state: { player1Deck, player2Deck, mode: 'Individual Draft' }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, player1Deck, player2Deck, navigate]);

  function handleCardPick(card) {
    if (picking || isComplete) return;
    setPicking(true);

    if (currentPlayer === 1) {
      const newDeck = [...player1Deck, card];
      setPlayer1Deck(newDeck);

      if (player2Deck.length < DECK_SIZE) {
        setCurrentPlayer(2);
        generateNewChoices(allCards);
      } else if (newDeck.length >= DECK_SIZE) {
        // Both done
      } else {
        generateNewChoices(allCards);
      }
    } else {
      const newDeck = [...player2Deck, card];
      setPlayer2Deck(newDeck);

      if (player1Deck.length < DECK_SIZE) {
        setCurrentPlayer(1);
        generateNewChoices(allCards);
      } else if (newDeck.length >= DECK_SIZE) {
        // Both done
      } else {
        generateNewChoices(allCards);
      }
    }

    setTimeout(() => setPicking(false), 300);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🃏</div>
          <p className="text-gray-400">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)]">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const currentDeck = currentPlayer === 1 ? player1Deck : player2Deck;
  const currentRound = currentDeck.length + 1;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-2">Individual Draft</h2>
      <PlayerIndicator currentPlayer={currentPlayer} />

      {isComplete && (
        <div className="text-center py-4">
          <p className="text-green-400 text-xl font-bold animate-pulse">Draft Complete! Showing results...</p>
        </div>
      )}

      {/* Current choices */}
      {!isComplete && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-300 mb-2 text-center">
            Round {currentRound} of {DECK_SIZE} — Pick a card!
          </h3>
          <div className="flex justify-center gap-6">
            {choices.map((card, i) => (
              <CardDisplay
                key={`choice-${i}-${card.id}`}
                card={card}
                onClick={handleCardPick}
                disabled={picking}
              />
            ))}
          </div>
        </div>
      )}

      {/* Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeckView deck={player1Deck} playerName="Player 1" maxCards={DECK_SIZE} />
        <DeckView deck={player2Deck} playerName="Player 2" maxCards={DECK_SIZE} />
      </div>
    </div>
  );
}
