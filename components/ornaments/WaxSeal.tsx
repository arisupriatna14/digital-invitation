interface WaxSealProps {
  size?: number;
  initials?: [string, string];
  className?: string;
}

// Segel lilin emas dengan tepi tidak rata dan monogram di tengah.
export default function WaxSeal({ size = 96, initials = ["A", "A"], className = "" }: WaxSealProps) {
  const c = 50;
  const edge = Array.from({ length: 72 }, (_, i) => {
    const t = (i / 72) * Math.PI * 2;
    const r = 46 + Math.sin(t * 7) * 1.6 + Math.sin(t * 13 + 1) * 1.1 + Math.cos(t * 3) * 1.4;
    return `${(c + Math.cos(t) * r).toFixed(2)},${(c + Math.sin(t) * r).toFixed(2)}`;
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`select-none drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)] ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="wax-gold" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#F2DC9B" />
          <stop offset="45%" stopColor="#C9A04F" />
          <stop offset="100%" stopColor="#8A6424" />
        </radialGradient>
        <radialGradient id="wax-inner" cx="55%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#D8B566" />
          <stop offset="100%" stopColor="#A57C33" />
        </radialGradient>
      </defs>
      <polygon points={edge.join(" ")} fill="url(#wax-gold)" />
      <circle cx={c} cy={c} r={34} fill="url(#wax-inner)" />
      <circle cx={c} cy={c} r={34} fill="none" stroke="#7A561C" strokeOpacity={0.45} strokeWidth={1.4} />
      <circle cx={c} cy={c} r={30} fill="none" stroke="#F5E3AE" strokeOpacity={0.5} strokeWidth={0.6} strokeDasharray="1.5 2" />
      <text
        x={c - 6}
        y={c + 6}
        textAnchor="middle"
        fontSize={30}
        fill="#FBF3DA"
        style={{ fontFamily: "var(--font-pinyon), cursive" }}
      >
        {initials[0]}
      </text>
      <text
        x={c + 8}
        y={c + 13}
        textAnchor="middle"
        fontSize={30}
        fill="#FBF3DA"
        style={{ fontFamily: "var(--font-pinyon), cursive" }}
      >
        {initials[1]}
      </text>
    </svg>
  );
}
