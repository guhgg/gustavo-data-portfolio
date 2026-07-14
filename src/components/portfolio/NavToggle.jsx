import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Core Engine', id: 'core-engine' },
  { label: 'Schematics', id: 'schematics' },
  { label: 'Tech Stack', id: 'tech-stack' },
  { label: 'About', id: 'about' },
  { label: 'Transmission', id: 'transmission' },
];

export default function NavToggle() {
  const [open, setOpen] = useState(false);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setUptime(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border bg-background/90 backdrop-blur-sm hover:border-primary transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
          SYS.STATUS
        </span>
        <span className="font-mono text-[11px] text-primary">
          {formatUptime(uptime)}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-56 border border-border bg-background/95 backdrop-blur-sm"
          >
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => {
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors border-b border-border/50 last:border-0"
              >
                <span className="font-mono text-[10px] text-primary/60">
                  {String(i).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs text-foreground">
                  {item.label}
                </span>
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
