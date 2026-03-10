import { useState } from 'react';

export default function CardDisplay({ card, onClick, disabled, selected, size = 'normal' }) {
  const [imgError, setImgError] = useState(false);

  const isSmall = size === 'small';
  const showImage = card.image && !imgError;

  return (
    <button
      onClick={() => !disabled && onClick?.(card)}
      disabled={disabled}
      className={`
        ${isSmall ? 'w-[72px]' : 'w-36'} overflow-hidden flex flex-col
        card-hover cursor-pointer relative bg-transparent border-0 p-0
        ${selected ? 'card-selected' : ''}
        ${disabled ? 'opacity-30 cursor-not-allowed' : ''}
      `}
    >
      {/* Card image */}
      <div className="relative w-full aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden">
        {showImage ? (
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
            <span className={`${isSmall ? 'text-base' : 'text-xl'} font-bold text-neutral-500`}>
              {card.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Cost - top left */}
        <div className={`absolute top-0 left-0 ${isSmall ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'} bg-purple-600 flex items-center justify-center text-white font-bold`}>
          {card.cost}
        </div>

        {/* Power - top right */}
        <div className={`absolute top-0 right-0 ${isSmall ? 'w-5 h-5 text-[10px]' : 'w-6 h-6 text-xs'} bg-neutral-950 flex items-center justify-center text-white font-bold`}>
          {card.power}
        </div>
      </div>

      {/* Card name */}
      <div className={`w-full ${isSmall ? 'py-0.5 text-[9px]' : 'py-1 text-xs'} text-center text-neutral-300 font-medium truncate`}>
        {card.name}
      </div>
    </button>
  );
}
