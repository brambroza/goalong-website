/** Wordmark: two lamps on a line — "going along" together. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="34"
        height="20"
        viewBox="0 0 34 20"
        aria-hidden="true"
        className="shrink-0"
      >
        <line x1="2" y1="10" x2="32" y2="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="10" cy="10" r="6" fill="#1d7f54" />
        <circle cx="24" cy="10" r="6" fill="#e3a018" />
      </svg>
      <span className="text-[1.2rem] font-semibold tracking-tight">
        GO Along
      </span>
    </span>
  );
}
