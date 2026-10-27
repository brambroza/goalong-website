/** GO Along brand mark: two green chevrons < >. */
export const LOGO_GREEN = "#40bd5f";
export const LOGO_VIEWBOX = "0 0 990 672";
export const LOGO_LEFT = "2,325 332,2 444,115 234,326 458,558 343,670";
export const LOGO_RIGHT = "988,325 658,2 546,115 756,326 532,558 647,670";

export function LogoMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={(size * 672) / 990}
      viewBox={LOGO_VIEWBOX}
      aria-hidden="true"
      className="shrink-0"
    >
      <polygon points={LOGO_LEFT} fill={LOGO_GREEN} />
      <polygon points={LOGO_RIGHT} fill={LOGO_GREEN} />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-[1.2rem] font-semibold tracking-tight">GO Along</span>
    </span>
  );
}
