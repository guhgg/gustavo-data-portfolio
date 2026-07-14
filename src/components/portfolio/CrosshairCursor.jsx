import { useState, useEffect } from 'react';

export default function CrosshairCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseleave', leave);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Vertical line */}
      <div
        className="absolute w-px h-5 bg-primary/60"
        style={{ left: pos.x, top: pos.y - 10 }}
      />
      <div
        className="absolute w-px h-5 bg-primary/60"
        style={{ left: pos.x, top: pos.y + 10 }}
      />
      {/* Horizontal line */}
      <div
        className="absolute h-px w-5 bg-primary/60"
        style={{ left: pos.x - 10, top: pos.y }}
      />
      <div
        className="absolute h-px w-5 bg-primary/60"
        style={{ left: pos.x + 10, top: pos.y }}
      />
      {/* Center dot */}
      <div
        className="absolute w-1 h-1 rounded-full bg-primary"
        style={{ left: pos.x - 2, top: pos.y - 2 }}
      />
      {/* Coordinates */}
      <div
        className="absolute font-mono text-[10px] text-muted-foreground/70 whitespace-nowrap"
        style={{ left: pos.x + 16, top: pos.y + 12 }}
      >
        {Math.round(pos.x)}, {Math.round(pos.y)}
      </div>
    </div>
  );
}
