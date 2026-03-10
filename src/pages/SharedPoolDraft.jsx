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

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-lg font-semibold text-center mb-1 text-neutral-200">Shared Pool Draft</h2>
      <PlayerIndicator currentPlayer={currentPlayer} />

      {isComplete && (
        <div className="text-center py-4">
          <p className="text-purple-400 text-sm font-semibold animate-pulse">Draft complete — loading results...</p>
        </div>
      )}

      {/* Shared Pool */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-neutral-500 uppercase tracking-wide">Pool</span>
          <span className="text-xs text-neutral-600">{pool.length - takenIds.size} remaining</span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
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
      <div className="border-t border-neutral-800 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DeckView deck={player1Deck} playerName="Player 1" maxCards={DECK_SIZE} />
          <DeckView deck={player2Deck} playerName="Player 2" maxCards={DECK_SIZE} />
        </div>
      </div>
    </div>
  );
}
