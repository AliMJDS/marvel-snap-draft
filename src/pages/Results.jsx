import { useLocation, Link } from 'react-router-dom';
import DeckView from '../components/DeckView';

export default function Results() {
  const location = useLocation();
  const { player1Deck, player2Deck, mode } = location.state || {};

  if (!player1Deck || !player2Deck) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center p-8">
        <p className="text-gray-400 mb-4">No draft results found.</p>
        <Link to="/" className="text-purple-400 hover:text-purple-300">Go back to home</Link>
      </div>
    );
  }

  function getDeckStats(deck) {
    const totalCost = deck.reduce((sum, c) => sum + c.cost, 0);
    const totalPower = deck.reduce((sum, c) => sum + c.power, 0);
    return {
      avgCost: (totalCost / deck.length).toFixed(1),
      totalPower,
      avgPower: (totalPower / deck.length).toFixed(1),
    };
  }

  const p1Stats = getDeckStats(player1Deck);
  const p2Stats = getDeckStats(player2Deck);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
        Draft Complete!
      </h2>
      <p className="text-center text-gray-400 mb-6">{mode}</p>

      {/* Stats comparison */}
      <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
        <div className="text-center">
          <p className="text-purple-300 font-bold">Player 1</p>
          <p className="text-2xl font-bold text-white">{p1Stats.totalPower}</p>
          <p className="text-xs text-gray-400">Total Power</p>
          <p className="text-sm text-gray-400">Avg Cost: {p1Stats.avgCost}</p>
        </div>
        <div className="text-center flex items-center justify-center">
          <span className="text-3xl text-gray-500">⚡</span>
        </div>
        <div className="text-center">
          <p className="text-blue-300 font-bold">Player 2</p>
          <p className="text-2xl font-bold text-white">{p2Stats.totalPower}</p>
          <p className="text-xs text-gray-400">Total Power</p>
          <p className="text-sm text-gray-400">Avg Cost: {p2Stats.avgCost}</p>
        </div>
      </div>

      {/* Decks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <DeckView deck={player1Deck} playerName="Player 1" />
        <DeckView deck={player2Deck} playerName="Player 2" />
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-bold transition-colors no-underline text-white"
        >
          New Draft
        </Link>
      </div>
    </div>
  );
}
