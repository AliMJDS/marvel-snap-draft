import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b border-neutral-800 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="no-underline">
          <span className="text-lg font-bold tracking-wider text-purple-400">
            SNAP DRAFT
          </span>
        </Link>
        <span className="text-xs text-neutral-600 tracking-wide uppercase">Marvel Snap</span>
      </div>
    </header>
  );
}
