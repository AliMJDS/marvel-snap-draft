import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchAllCards, generateSharedPool } from '../services/cardService';
import CardDisplay from '../components/CardDisplay';
import DeckView from '../components/DeckView';
import PlayerIndicator from '../components/PlayerIndicator';

const DECK_SIZE = 12;
const POOL_SIZE = 30;

export default function SharedPoolDraft() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pool, setPool] = useState([]);
  const [takenIds, setTakenIds] = useState(new Set());
  const [player1Deck, setPlayer1Deck] = useState([]);
  const [player2Deck, setPlayer2Deck] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    async function init() {
      try {
        const cards = await fetchAllCards();
        const sharedPool = generateSharedPool(cards, POOL_SIZE);
        setPool(sharedPool);
      } catch (e) {
        setError('Failed to load cards. Please refresh.');
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const isComplete = player1Deck.length >= DECK_SIZE && player2Deck.length >= DECK_SIZE;

  useEffect(() => {
    if (isComplete) {
      const timer = setTimeout(() => {
        navigate('/results', {
          state: { player1Deck, player2Deck, mode: 'Shared Pool Draft' }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isComplete, player1Deck, player2Deck, navigate]);

  function handleCardPick(card) {
    if (takenIds.has(card.poolId)) return;

    const newTaken = new Set(takenIds);
    newTaken.add(card.poolId);
    setTakenIds(newTaken);

    if (currentPlayer === 1) {
      setPlayer1Deck(prev => [...prev, card]);
      if (player2Deck.length < DECK_SIZE) {
        setCurrentPlayer(2);
      }
    } else {
      setPlayer2Deck(prev => [...prev, card]);
      if (player1Deck.length + 1 <= DECK_SIZE || player1Deck.length < DECK_SIZE) {
        setCurrentPlayer(1);
      }
    }
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

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-2">Shared Pool Draft</h2>
      <PlayerIndicator currentPlayer={currentPlayer} />

      {isComplete && (
        <div className="text-center py-4">
          <p className="text-green-400 text-xl font-bold animate-pulse">Draft Complete! Showing results...</p>
        </div>
      )}

      {/* Shared Pool */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">
          Shared Pool ({pool.length - takenIds.size} cards remaining)
        </h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {pool.map(card => (
            <CardDisplay
              key={card.poolId}
              card={card}
              onClick={handleCardPick}
              disabled={takenIds.has(card.poolId) || isComplete}
              size="small"
            />
          ))}
        </div>
      </div>

      {/* Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DeckView deck={player1Deck} playerName="Player 1" maxCards={DECK_SIZE} />
        <DeckView deck={player2Deck} playerName="Player 2" maxCards={DECK_SIZE} />
      </div>
    </div>
  );
}
