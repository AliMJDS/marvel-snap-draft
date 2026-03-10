export default function PlayerIndicator({ currentPlayer, player1Name = "Player 1", player2Name = "Player 2" }) {
  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      <div className={`px-4 py-2 rounded-lg font-bold transition-all ${
        currentPlayer === 1
          ? 'bg-purple-600 text-white scale-110'
          : 'bg-slate-700 text-gray-400'
      }`}>
        {player1Name}
      </div>
      <span className="text-gray-500 text-lg">vs</span>
      <div className={`px-4 py-2 rounded-lg font-bold transition-all ${
        currentPlayer === 2
          ? 'bg-blue-600 text-white scale-110'
          : 'bg-slate-700 text-gray-400'
      }`}>
        {player2Name}
      </div>
    </div>
  );
}
