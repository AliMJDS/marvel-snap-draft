import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllCards, generateDraftChoices } from '../services/cardService';
import CardDisplay from '../components/CardDisplay';
import DeckView from '../components/DeckView';

const DECK_SIZE = 12;
const CHOICES_COUNT = 3;

export default function IndividualDraft() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allCards, setAllCards] = useState([]);
  const [deck, setDeck] = useState([]);
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

  const isComplete = deck.length >= DECK_SIZE;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate('/results', {
          state: { player1Deck: deck, mode: 'Individual Draft' }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, deck, navigate]);

  function handleCardPick(card) {
    if (picking || isComplete) return;
    setPicking(true);

    setDeck(prev => [...prev, card]);
    generateNewChoices(allCards);

    setTimeout(() => setPicking(false), 300);
  }

  function handleRerollCard(index) {
    if (picking) return;
    setChoices(prev => {
      const updated = [...prev];
      const [newCard] = generateDraftChoices(allCards, 1);
      updated[index] = newCard;
      return updated;
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <p className="text-neutral-500 text-sm animate-pulse">Loading cards...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-56px)]">
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  const currentRound = deck.length + 1;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold text-center mb-6 text-neutral-200">Individual Draft</h2>

      {isComplete && (
        <div className="text-center py-4">
          <p className="text-purple-400 text-sm font-semibold animate-pulse">Draft complete — loading results...</p>
        </div>
      )}

      {/* Current choices */}
      {!isComplete && (
        <div className="mb-10">
          <p className="text-xs text-neutral-500 text-center mb-6">
            Round {currentRound} / {DECK_SIZE} — pick a card
          </p>
          <div className="flex justify-center gap-8">
            {choices.map((card, i) => (
              <div key={`choice-${i}-${card.id}`} className="flex flex-col items-center gap-2">
                <CardDisplay
                  card={card}
                  onClick={handleCardPick}
                  disabled={picking}
                />
                <button
                  onClick={() => handleRerollCard(i)}
                  disabled={picking}
                  className="px-3 py-1 text-[10px] text-neutral-500 border border-neutral-700 rounded hover:bg-neutral-800 hover:text-neutral-300 transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Reroll
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Deck */}
      <div className="border-t border-neutral-800 pt-6 max-w-md mx-auto">
        <DeckView deck={deck} playerName="Your Deck" maxCards={DECK_SIZE} />
      </div>
    </div>
  );
}
