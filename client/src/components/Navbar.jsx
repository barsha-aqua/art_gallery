import { NavLink, Link } from "react-router-dom";
import { Search } from "lucide-react";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `text-sm tracking-wide transition-colors ${
      isActive
        ? "text-terracotta border-b border-terracotta pb-1 font-medium"
        : "text-stone-500 hover:text-terracotta"
    }`;

  return (
    <nav className="flex items-center justify-between py-8 px-6 md:px-12 w-full max-w-7xl mx-auto">
      {/* Left: Wordmark */}
      <Link
        to="/"
        className="font-serif text-2xl md:text-3xl text-terracotta font-medium tracking-wide"
      >
        Ethereal Canvas
      </Link>

      {/* Center: Nav Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <NavLink to="/" className={linkClass}>
          Gallery
        </NavLink>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
        <NavLink to="/auctions" className={linkClass}>
          Auctions
        </NavLink>
        <NavLink to="/portraits" className={linkClass}>
          Portraits
        </NavLink>
        <NavLink to="/poems" className={linkClass}>
          Poems
        </NavLink>
      </div>

      {/* Right: Search Icon */}
      <div className="flex items-center text-stone-600 hover:text-terracotta cursor-pointer transition-colors">
        <Search size={20} strokeWidth={1.5} />
      </div>
    </nav>
  );
}
