import { useState } from 'react';

export default function CardDisplay({ card, onClick, disabled, selected, size = 'normal' }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = size === 'small'
    ? 'w-24 min-h-32'
    : 'w-40 min-h-56';

  const textSize = size === 'small' ? 'text-xs' : 'text-sm';

  return (
    <button
      onClick={() => !disabled && onClick?.(card)}
      disabled={disabled}
      className={`
        ${sizeClasses} rounded-xl border-2 overflow-hidden flex flex-col
        transition-all duration-300 cursor-pointer relative
        ${selected
          ? 'card-selected bg-green-900/30'
          : disabled
            ? 'border-gray-700 bg-gray-800/50 opacity-40 cursor-not-allowed'
            : 'border-purple-500/50 bg-slate-800/80 card-glow hover:border-purple-400'
        }
      `}
    >
      {/* Cost badge */}
      <div className="absolute top-1 left-1 z-10 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border border-blue-400">
        {card.cost}
      </div>

      {/* Power badge */}
      <div className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm border border-orange-400">
        {card.power}
      </div>

      {/* Card image */}
      <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-purple-900/30 to-slate-900/50 p-2 pt-8">
        {card.image && !imgError ? (
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-auto max-h-28 object-contain rounded"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="text-3xl">🃏</div>
        )}
      </div>

      {/* Card name */}
      <div className={`p-1.5 bg-slate-900/80 text-center ${textSize} font-semibold truncate`}>
        {card.name}
      </div>

      {/* Ability text */}
      {size !== 'small' && card.ability && (
        <div className="px-1.5 pb-1.5 bg-slate-900/80 text-center text-xs text-gray-400 line-clamp-2">
          {card.ability}
        </div>
      )}
    </button>
  );
}
