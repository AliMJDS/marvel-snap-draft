import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-slate-900/80 border-b border-purple-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 no-underline">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            SNAP DRAFT
          </span>
        </Link>
        <span className="text-sm text-gray-500">Marvel Snap Draft Mode</span>
      </div>
    </header>
  );
}
