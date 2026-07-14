export default function GridLines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="max-w-[1440px] mx-auto h-full relative">
        {Array.from({ length: 17 }).map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-foreground/[0.03]"
            style={{ left: `${(i / 16) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
}
