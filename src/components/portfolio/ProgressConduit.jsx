import { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'core-engine', label: '00:INIT' },
  { id: 'schematics', label: '01:PROJ' },
  { id: 'tech-stack', label: '02:TECH' },
  { id: 'about', label: '03:ABOT' },
  { id: 'transmission', label: '04:XMIT' },
];

export default function ProgressConduit() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-border/50">
      <div className="relative h-8 flex items-center px-4">
        {/* Track */}
        <div className="absolute top-1/2 left-4 right-4 h-px bg-border -translate-y-1/2" />
        {/* Fill */}
        <div
          className="absolute top-1/2 left-4 h-px bg-primary -translate-y-1/2 transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
        {/* Section markers */}
        {SECTIONS.map((s, i) => {
          const pct = (i / (SECTIONS.length - 1)) * 100;
          const active = progress >= pct - 2;
          return (
            <button
              key={s.id}
              onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute -translate-x-1/2 flex items-center gap-1"
              style={{ left: `calc(${pct}% * 0.92 + 4%)` }}
            >
              <div className={`w-1.5 h-1.5 rounded-full transition-colors ${active ? 'bg-primary' : 'bg-border'}`} />
              <span className={`font-mono text-[9px] tracking-wider transition-colors hidden sm:inline ${active ? 'text-primary' : 'text-muted-foreground/50'}`}>
                {s.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
