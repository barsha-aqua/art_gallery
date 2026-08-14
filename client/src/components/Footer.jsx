import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-canvas border-t border-stone-200 mt-24 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        {/* Left: Wordmark */}
        <Link
          to="/"
          className="font-serif text-xl md:text-2xl text-stone-800 font-medium tracking-wide"
        >
          Ochre &amp; Ink
        </Link>

        {/* Center: Contact Links */}
        <div className="flex space-x-6 text-stone-500 uppercase tracking-widest text-[10px] font-semibold">
          <a
            href="mailto:123barsha4@gmail.com"
            className="hover:text-terracotta transition-colors underline underline-offset-4 decoration-stone-300"
          >
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/barsha-yadav-9772b22a4/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-terracotta transition-colors underline underline-offset-4 decoration-stone-300"
          >
            LinkedIn
          </a>
        </div>

        {/* Right: Copyright + Terms */}
        <div className="flex items-center gap-4 text-stone-500 text-[11px]">
          <span>&copy; 2026 Ochre &amp; Ink. All rights reserved.</span>
          <Link
            to="/terms"
            className="underline underline-offset-4 decoration-stone-300 hover:text-terracotta transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
