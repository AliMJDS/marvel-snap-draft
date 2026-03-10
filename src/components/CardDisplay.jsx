import { useState, useMemo } from 'react';

const COST_GRADIENTS = {
  0: 'from-gray-600 via-gray-500 to-gray-700',
  1: 'from-emerald-700 via-emerald-500 to-teal-700',
  2: 'from-blue-700 via-blue-500 to-cyan-700',
  3: 'from-purple-700 via-purple-500 to-indigo-700',
  4: 'from-red-700 via-rose-500 to-pink-700',
  5: 'from-amber-700 via-yellow-500 to-orange-700',
  6: 'from-fuchsia-700 via-pink-500 to-rose-700',
};

function getInitials(name) {
  return name.split(/[\s-]+/).map(w => w[0]).join('').slice(0, 3).toUpperCase();
}

export default function CardDisplay({ card, onClick, disabled, selected, size = 'normal' }) {
  const [imgError, setImgError] = useState(false);

  const gradient = useMemo(() => {
    const cost = Math.min(Math.max(card.cost, 0), 6);
    return COST_GRADIENTS[cost] || COST_GRADIENTS[3];
  }, [card.cost]);

  const sizeClasses = size === 'small'
    ? 'w-24 min-h-32'
    : 'w-40 min-h-56';

  const textSize = size === 'small' ? 'text-xs' : 'text-sm';
  const showImage = card.image && !imgError;

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
      <div className="absolute top-1 left-1 z-10 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm border border-blue-400 shadow-lg">
        {card.cost}
      </div>

      {/* Power badge */}
      <div className="absolute top-1 right-1 z-10 w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-sm border border-orange-400 shadow-lg">
        {card.power}
      </div>

      {/* Card image or art placeholder */}
      <div className={`flex-1 flex items-center justify-center p-2 pt-8 bg-gradient-to-br ${gradient}`}>
        {showImage ? (
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-auto max-h-28 object-contain rounded"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <div className={`${size === 'small' ? 'w-10 h-10 text-sm' : 'w-14 h-14 text-lg'} rounded-full bg-black/30 border border-white/20 flex items-center justify-center font-bold text-white/90 backdrop-blur-sm`}>
              {getInitials(card.name)}
            </div>
          </div>
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
