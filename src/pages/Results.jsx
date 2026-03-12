import { useLocation, Link } from 'react-router-dom';
import DeckView from '../components/DeckView';

export default function Results() {
  const location = useLocation();
  const { player1Deck, player2Deck, mode } = location.state || {};

  const isSinglePlayer = !player2Deck;

  if (!player1Deck) {
    return (
      <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-8">
        <p className="text-neutral-500 text-sm mb-4">No draft results found.</p>
        <Link to="/" className="text-purple-400 text-sm hover:text-purple-300">Back to home</Link>
      </div>
    );
  }

  function getDeckStats(deck) {
    const totalCost = deck.reduce((sum, c) => sum + c.cost, 0);
    const totalPower = deck.reduce((sum, c) => sum + c.power, 0);
    return {
      avgCost: (totalCost / deck.length).toFixed(1),
      totalPower,
    };
  }

  const p1Stats = getDeckStats(player1Deck);
  const p2Stats = !isSinglePlayer ? getDeckStats(player2Deck) : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-lg font-semibold text-center mb-1 text-neutral-200">
        Draft Complete
      </h2>
      <p className="text-center text-neutral-600 text-xs mb-8">{mode}</p>

      {/* Stats */}
      <div className="flex items-center justify-center gap-12 mb-10">
        <div className="text-center">
          <p className="text-xs text-neutral-500 mb-1">{isSinglePlayer ? 'Your Deck' : 'Player 1'}</p>
          <p className="text-2xl font-bold text-neutral-200">{p1Stats.totalPower}</p>
          <p className="text-[10px] text-neutral-600">power / {p1Stats.avgCost} avg cost</p>
        </div>
        {!isSinglePlayer && (
          <>
            <div className="w-px h-10 bg-neutral-800" />
            <div className="text-center">
              <p className="text-xs text-neutral-500 mb-1">Player 2</p>
              <p className="text-2xl font-bold text-neutral-200">{p2Stats.totalPower}</p>
              <p className="text-[10px] text-neutral-600">power / {p2Stats.avgCost} avg cost</p>
            </div>
          </>
        )}
      </div>

      {/* Decks */}
      {isSinglePlayer ? (
        <div className="max-w-md mx-auto mb-10">
          <DeckView deck={player1Deck} playerName="Your Deck" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <DeckView deck={player1Deck} playerName="Player 1" />
          <DeckView deck={player2Deck} playerName="Player 2" />
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center">
        <Link
          to="/"
          className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors no-underline"
        >
          New Draft
        </Link>
      </div>
    </div>
  );
}
