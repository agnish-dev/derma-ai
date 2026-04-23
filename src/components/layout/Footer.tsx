import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full mt-auto relative z-10 print:hidden px-6 py-6 border-t border-blue-500/10 bg-gradient-to-t from-slate-100/50 to-transparent dark:from-slate-900/50 shadow-[0_-10px_30px_rgba(59,130,246,0.03)] transition-colors duration-500 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        
        {/* Left - Credits */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
            Developed by Agnish Mondal &amp; Aritra Dasgupta
          </p>
          <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 drop-shadow-sm opacity-90 transition-opacity hover:opacity-100">
            Syntaxx Brothers
          </span>
        </div>

        {/* Right - Contact */}
        <div className="flex-1 flex flex-col items-center md:items-end justify-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest opacity-80">
            Connect with us
          </span>
          <Link 
            href="https://instagram.com/syntaxx_brothers" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-2 transition-all text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <span className="text-sm font-medium tracking-wide group-hover:underline decoration-blue-500/30 underline-offset-4">
              @syntaxx_brothers
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-300">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </Link>
        </div>

      </div>
    </footer>
  );
}
