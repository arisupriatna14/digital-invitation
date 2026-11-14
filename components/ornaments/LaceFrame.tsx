"use client";

import { useEffect, useRef, useState } from "react";

interface LaceFrameProps {
  shape?: "rect" | "oval";
  /** Lebar pita renda (px) */
  band?: number;
  className?: string;
  children: React.ReactNode;
}

type Pt = [number, number];

// Titik-titik berjarak sama di sepanjang keliling bentuk.
function perimeter(shape: "rect" | "oval", w: number, h: number, inset: number, step: number): Pt[] {
  const pts: Pt[] = [];
  if (shape === "oval") {
    const rx = w / 2 - inset;
    const ry = h / 2 - inset;
    const dense: Pt[] = [];
    for (let i = 0; i <= 1000; i++) {
      const t = (i / 1000) * Math.PI * 2;
      dense.push([w / 2 + Math.cos(t) * rx, h / 2 + Math.sin(t) * ry]);
    }
    let acc = step;
    for (let i = 1; i < dense.length; i++) {
      acc += Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]);
      if (acc >= step) {
        pts.push(dense[i]);
        acc = 0;
      }
    }
    return pts;
  }
  const x0 = inset;
  const y0 = inset;
  const x1 = w - inset;
  const y1 = h - inset;
  const edges: [Pt, Pt][] = [
    [[x0, y0], [x1, y0]],
    [[x1, y0], [x1, y1]],
    [[x1, y1], [x0, y1]],
    [[x0, y1], [x0, y0]],
  ];
  for (const [[ax, ay], [bx, by]] of edges) {
    const len = Math.hypot(bx - ax, by - ay);
    const n = Math.max(1, Math.round(len / step));
    for (let i = 0; i < n; i++) {
      pts.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n]);
    }
  }
  return pts;
}

function shapePath(shape: "rect" | "oval", w: number, h: number, inset: number) {
  if (shape === "oval") {
    const rx = w / 2 - inset;
    const ry = h / 2 - inset;
    return `M ${w / 2 - rx} ${h / 2} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0 Z`;
  }
  return `M ${inset} ${inset} H ${w - inset} V ${h - inset} H ${inset} Z`;
}

// Bingkai renda: pita bermotif jaring, tepi luar berkelok (scallop)
// dengan lubang, dan manik-manik di tepi dalam.
export default function LaceFrame({ shape = "rect", band = 26, className = "", children }: LaceFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scallopR = 7;
  const outerInset = scallopR + 1;
  const innerInset = outerInset + band;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="relative z-0" style={{ padding: innerInset }}>
        {children}
      </div>
      {size && size.w > 0 && (
        <svg
          className="absolute inset-0 z-10 pointer-events-none"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden
        >
          <defs>
            <pattern id={`mesh-${shape}`} width="7" height="7" patternUnits="userSpaceOnUse">
              <rect width="7" height="7" fill="#EFE9DC" />
              <circle cx="3.5" cy="3.5" r="1.3" fill="#D3CAB6" />
            </pattern>
            <filter id="lace-shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#lace-shadow)">
            {/* Scallop tepi luar */}
            {perimeter(shape, size.w, size.h, outerInset, scallopR * 1.7).map(([x, y], i) => (
              <circle key={`s${i}`} cx={x} cy={y} r={scallopR} fill="#F7F2E8" />
            ))}
            {/* Pita jaring */}
            <path
              d={`${shapePath(shape, size.w, size.h, outerInset)} ${shapePath(shape, size.w, size.h, innerInset)}`}
              fill={`url(#mesh-${shape})`}
              fillRule="evenodd"
            />
          </g>
          {/* Lubang pada scallop */}
          {perimeter(shape, size.w, size.h, outerInset - 2, scallopR * 1.7).map(([x, y], i) => (
            <circle key={`h${i}`} cx={x} cy={y} r={1.6} fill="#CFC6B2" />
          ))}
          {/* Garis tepi luar & dalam */}
          <path d={shapePath(shape, size.w, size.h, outerInset + 3)} fill="none" stroke="#FFFFFF" strokeWidth={2} />
          <path d={shapePath(shape, size.w, size.h, innerInset)} fill="none" stroke="#FFFFFF" strokeWidth={3} />
          {/* Manik tepi dalam */}
          {perimeter(shape, size.w, size.h, innerInset - 5, 11).map(([x, y], i) => (
            <circle key={`b${i}`} cx={x} cy={y} r={2.4} fill="#FFFFFF" stroke="#D3CAB6" strokeWidth={0.6} />
          ))}
          {/* Bunga renda: pojok (persegi) atau atas-bawah (oval) */}
          {(shape === "rect"
            ? ([
                [innerInset - band / 2, innerInset - band / 2],
                [size.w - innerInset + band / 2, innerInset - band / 2],
                [innerInset - band / 2, size.h - innerInset + band / 2],
                [size.w - innerInset + band / 2, size.h - innerInset + band / 2],
                [size.w / 2, innerInset - band / 2],
                [size.w / 2, size.h - innerInset + band / 2],
              ] as Pt[])
            : ([
                [size.w / 2, innerInset - band / 2],
                [size.w / 2, size.h - innerInset + band / 2],
                [innerInset - band / 2, size.h / 2],
                [size.w - innerInset + band / 2, size.h / 2],
              ] as Pt[])
          ).map(([x, y], i) => (
            <LaceFlower key={`f${i}`} x={x} y={y} r={band * 0.55} />
          ))}
        </svg>
      )}
    </div>
  );
}

function LaceFlower({ x, y, r }: { x: number; y: number; r: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <ellipse
          key={a}
          cx={0}
          cy={-r * 0.55}
          rx={r * 0.32}
          ry={r * 0.5}
          transform={`rotate(${a})`}
          fill="#FFFFFF"
          stroke="#D3CAB6"
          strokeWidth={0.6}
        />
      ))}
      <circle r={r * 0.28} fill="#EFE9DC" stroke="#D3CAB6" strokeWidth={0.6} />
    </g>
  );
}
