interface PearlsProps {
  /** Lebar rangkaian (px) */
  width?: number;
  /** Jumlah lilitan/loop pada untaian */
  loops?: number;
  /** Diameter mutiara (px) */
  size?: number;
  className?: string;
}

// Untaian mutiara yang berlilit (kurva trokoid): setiap mutiara
// ditempatkan berjarak sama sepanjang kurva.
export default function Pearls({ width = 220, loops = 2, size = 9, className = "" }: PearlsProps) {
  const a = 1;
  const b = 1.9; // b > a menghasilkan loop
  const tMax = Math.PI * 2 * loops;

  // Sampel kurva rapat, lalu skalakan ke lebar target
  const raw: [number, number][] = [];
  for (let i = 0; i <= 600; i++) {
    const t = (i / 600) * tMax;
    raw.push([a * t - b * Math.sin(t), b * Math.cos(t) * 0.55 + Math.sin(t / loops) * 0.6]);
  }
  const xs = raw.map((p) => p[0]);
  const ys = raw.map((p) => p[1]);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const scale = (width - size) / (Math.max(...xs) - minX);
  const height = (Math.max(...ys) - minY) * scale + size;
  const pts = raw.map(([x, y]) => [(x - minX) * scale + size / 2, (y - minY) * scale + size / 2]);

  // Ambil titik setiap jarak ~diameter mutiara
  const pearls: [number, number][] = [pts[0] as [number, number]];
  let acc = 0;
  for (let i = 1; i < pts.length; i++) {
    acc += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    if (acc >= size * 0.98) {
      pearls.push(pts[i] as [number, number]);
      acc = 0;
    }
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="pearl-sheen" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#ECEAE4" />
          <stop offset="100%" stopColor="#A9A6A0" />
        </radialGradient>
      </defs>
      {pearls.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={size / 2 - 0.4} fill="url(#pearl-sheen)" />
      ))}
    </svg>
  );
}
