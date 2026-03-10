import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-72px)] flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
        SNAP DRAFT
      </h1>
      <p className="text-gray-400 text-lg mb-12 text-center max-w-md">
        A new way to build Marvel Snap decks. Draft cards with a friend and battle with what you get!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Mode 1 - Shared Pool */}
        <Link
          to="/draft/shared-pool"
          className="group bg-slate-800/60 border-2 border-purple-500/30 rounded-2xl p-6 hover:border-purple-400 hover:bg-slate-800/80 transition-all no-underline"
        >
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-xl font-bold text-white mb-2">Shared Pool Draft</h2>
          <p className="text-gray-400 text-sm mb-4">
            Both players draft from a shared pool of cards. Cards can appear up to 2 times randomly. Take turns picking — once a card is taken, it's gone!
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Turn-based</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Shared pool</span>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">Up to 2 dupes</span>
          </div>
        </Link>

        {/* Mode 2 - Individual Draft */}
        <Link
          to="/draft/individual"
          className="group bg-slate-800/60 border-2 border-blue-500/30 rounded-2xl p-6 hover:border-blue-400 hover:bg-slate-800/80 transition-all no-underline"
        >
          <div className="text-4xl mb-4">🃏</div>
          <h2 className="text-xl font-bold text-white mb-2">Individual Draft</h2>
          <p className="text-gray-400 text-sm mb-4">
            Each player gets their own set of 3 random cards. Pick 1, discard 2, and get a fresh set. Build your deck your way!
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Independent</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Pick 1 of 3</span>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">12 rounds</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
