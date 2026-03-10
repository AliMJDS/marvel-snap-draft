import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2 text-purple-400 tracking-wider">
        SNAP DRAFT
      </h1>
      <p className="text-neutral-500 text-sm mb-16 text-center max-w-sm">
        Draft cards with a friend. Build a deck. Battle with what you get.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl w-full">
        <Link
          to="/draft/shared-pool"
          className="group border border-neutral-800 p-6 hover:border-purple-500/50 hover:bg-neutral-900/50 transition-all no-underline"
        >
          <h2 className="text-base font-semibold text-neutral-200 mb-2">Shared Pool</h2>
          <p className="text-neutral-500 text-xs mb-4 leading-relaxed">
            Both players draft from a shared pool. Take turns picking — once a card is taken, it's gone.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 border border-neutral-700 text-neutral-400 text-[10px]">Turn-based</span>
            <span className="px-2 py-0.5 border border-neutral-700 text-neutral-400 text-[10px]">30 cards</span>
          </div>
        </Link>

        <Link
          to="/draft/individual"
          className="group border border-neutral-800 p-6 hover:border-purple-500/50 hover:bg-neutral-900/50 transition-all no-underline"
        >
          <h2 className="text-base font-semibold text-neutral-200 mb-2">Individual Draft</h2>
          <p className="text-neutral-500 text-xs mb-4 leading-relaxed">
            Each player picks 1 of 3 random cards per round. Build your deck your way.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-0.5 border border-neutral-700 text-neutral-400 text-[10px]">Pick 1 of 3</span>
            <span className="px-2 py-0.5 border border-neutral-700 text-neutral-400 text-[10px]">12 rounds</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
