interface FlourishProps {
  width?: number;
  color?: string;
  className?: string;
}

// Hiasan ukiran kecil (scroll simetris) untuk pemisah teks.
export default function Flourish({ width = 64, color = "currentColor", className = "" }: FlourishProps) {
  return (
    <svg
      width={width}
      height={width * 0.4}
      viewBox="0 0 100 40"
      className={`mx-auto select-none ${className}`}
      aria-hidden
    >
      <g fill="none" stroke={color} strokeWidth={1.6} strokeLinecap="round">
        <path d="M50 30 C 40 30, 34 22, 38 15 C 41 10, 48 12, 46 18" />
        <path d="M50 30 C 60 30, 66 22, 62 15 C 59 10, 52 12, 54 18" />
        <path d="M38 24 C 28 30, 14 28, 8 20 C 4 14, 12 10, 15 16" />
        <path d="M62 24 C 72 30, 86 28, 92 20 C 96 14, 88 10, 85 16" />
        <path d="M50 30 L 50 8" />
      </g>
      <g fill={color}>
        <circle cx={50} cy={6} r={3} />
        <circle cx={43} cy={9} r={2} />
        <circle cx={57} cy={9} r={2} />
        <circle cx={50} cy={34} r={1.8} />
      </g>
    </svg>
  );
}
