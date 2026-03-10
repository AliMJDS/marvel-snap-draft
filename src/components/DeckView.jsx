import CardDisplay from './CardDisplay';

export default function DeckView({ deck, playerName, maxCards = 12 }) {
  const sortedDeck = [...deck].sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-neutral-300 tracking-wide">{playerName}</h3>
        <span className="text-xs text-neutral-600">{deck.length}/{maxCards}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-neutral-800 mb-4">
        <div
          className="h-0.5 bg-purple-500 transition-all duration-500"
          style={{ width: `${(deck.length / maxCards) * 100}%` }}
        />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
        {sortedDeck.map((card, i) => (
          <CardDisplay key={`${card.id}-${i}`} card={card} size="small" />
        ))}
        {Array.from({ length: maxCards - deck.length }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="w-[72px] aspect-[3/4] bg-neutral-900/50 border border-dashed border-neutral-800 flex items-center justify-center text-neutral-700 text-xs rounded-sm"
          />
        ))}
      </div>
    </div>
  );
}
