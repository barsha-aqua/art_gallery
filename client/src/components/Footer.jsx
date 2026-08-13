import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-stone-200 mt-24 py-10 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between text-sm">
      {/* Left: Wordmark */}
      <Link
        to="/"
        className="font-serif text-xl md:text-2xl text-stone-800 font-medium tracking-wide mb-4 md:mb-0"
      >
        Ethereal Canvas
      </Link>

      {/* Center: Social Links */}
      <div className="flex space-x-6 text-stone-500 uppercase tracking-widest text-[10px] font-semibold mb-4 md:mb-0">
        <a href="#" className="hover:text-terracotta transition-colors underline underline-offset-4 decoration-stone-300">
          Instagram
        </a>
        <a href="#" className="hover:text-terracotta transition-colors underline underline-offset-4 decoration-stone-300">
          Twitter
        </a>
        <a href="#" className="hover:text-terracotta transition-colors underline underline-offset-4 decoration-stone-300">
          LinkedIn
        </a>
      </div>

      {/* Right: Copyright */}
      <div className="text-stone-500">
        &copy; 2026 Ethereal Canvas. All rights reserved.
      </div>
    </footer>
  );
}
