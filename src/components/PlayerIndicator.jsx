export default function PlayerIndicator({ currentPlayer, player1Name = "Player 1", player2Name = "Player 2" }) {
  return (
    <div className="flex items-center justify-center gap-6 mb-6">
      <div className={`px-4 py-1.5 text-sm font-semibold transition-all ${
        currentPlayer === 1
          ? 'text-purple-400 border-b-2 border-purple-400'
          : 'text-neutral-600 border-b-2 border-transparent'
      }`}>
        {player1Name}
      </div>
      <span className="text-neutral-700 text-xs">vs</span>
      <div className={`px-4 py-1.5 text-sm font-semibold transition-all ${
        currentPlayer === 2
          ? 'text-purple-400 border-b-2 border-purple-400'
          : 'text-neutral-600 border-b-2 border-transparent'
      }`}>
        {player2Name}
      </div>
    </div>
  );
}
