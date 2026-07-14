import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-mono text-muted-foreground gap-4">
      <div className="text-primary text-4xl font-bold">404</div>
      <div className="text-sm tracking-widest uppercase">Page not found</div>
      <Link to="/" className="text-xs text-primary hover:underline mt-4">← Back to home</Link>
    </div>
  );
}
