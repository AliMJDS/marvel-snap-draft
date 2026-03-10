import CardDisplay from './CardDisplay';

export default function DeckView({ deck, playerName, maxCards = 12 }) {
  const sortedDeck = [...deck].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

  return (
    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-purple-300">{playerName}</h3>
        <span className="text-sm text-gray-400">{deck.length}/{maxCards} cards</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-slate-700 rounded-full mb-3">
        <div
          className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${(deck.length / maxCards) * 100}%` }}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-4 gap-2">
        {sortedDeck.map((card, i) => (
          <CardDisplay key={`${card.id}-${i}`} card={card} size="small" />
        ))}
        {Array.from({ length: maxCards - deck.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-24 min-h-32 rounded-xl border-2 border-dashed border-slate-600 flex items-center justify-center text-slate-600 text-xs"
          >
            ?
          </div>
        ))}
      </div>
    </div>
  );
}
