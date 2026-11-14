interface LaceEdgeProps {
  /** Arah scallop: "down" = gerigi di bawah, "up" = gerigi di atas */
  direction?: "down" | "up";
  className?: string;
}

// Pita renda horizontal sebagai peralihan antar section.
export default function LaceEdge({ direction = "down", className = "" }: LaceEdgeProps) {
  const W = 480;
  const H = 44;
  const step = 24;
  const n = Math.ceil(W / step) + 1;

  return (
    <div className={`relative w-full pointer-events-none select-none ${className}`} aria-hidden>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="block w-full h-11"
        style={direction === "up" ? { transform: "scaleY(-1)" } : undefined}
      >
        <defs>
          <pattern id="edge-mesh" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#FFFFFF" fillOpacity={0.9} />
            <circle cx="3" cy="3" r="1.2" fill="#353A20" fillOpacity={0.35} />
          </pattern>
        </defs>
        <rect x={0} y={0} width={W} height={18} fill="url(#edge-mesh)" />
        <rect x={0} y={16} width={W} height={3} fill="#FFFFFF" />
        {Array.from({ length: n }, (_, i) => {
          const cx = i * step;
          return (
            <g key={i}>
              <path
                d={`M ${cx - step / 2} 18 Q ${cx - step / 2} 40 ${cx} 40 Q ${cx + step / 2} 40 ${cx + step / 2} 18 Z`}
                fill="#FFFFFF"
              />
              {/* Bunga kecil di tiap scallop */}
              {[0, 72, 144, 216, 288].map((a) => (
                <ellipse
                  key={a}
                  cx={cx}
                  cy={25}
                  rx={1.7}
                  ry={3.2}
                  transform={`rotate(${a} ${cx} 29)`}
                  fill="#353A20"
                  fillOpacity={0.4}
                />
              ))}
              <circle cx={cx + step / 2} cy={23} r={1.6} fill="#353A20" fillOpacity={0.45} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
