"use client";

// Aset bunga & daun kecil yang melayang turun
const PETAL_ASSETS = [
  { src: "/images/flowers/leaf-pink.png", w: 22, h: 40 },
  { src: "/images/flowers/primrose.png", w: 34, h: 34 },
  { src: "/images/flowers/leaf-sage.png", w: 24, h: 35 },
  { src: "/images/flowers/leaf-green.png", w: 18, h: 34 },
  { src: "/images/flowers/leaf-olive-small.png", w: 22, h: 29 },
];

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${i * 6.5}%`,
  delay: `${i * 1.05}s`,
  duration: `${9 + (i % 4) * 1.5}s`,
  isLeft: i % 2 === 0,
  asset: PETAL_ASSETS[i % PETAL_ASSETS.length],
}));

export default function FloatingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {PETALS.map((p) => (
        <div
          key={p.id}
          className={`petal ${p.isLeft ? "animate-float-petal-left" : "animate-float-petal"}`}
          style={{
            left: p.left,
            top: "-5%",
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.asset.w,
            height: p.asset.h,
            opacity: 0.75,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.asset.src}
            alt=""
            aria-hidden
            className="h-full w-full select-none object-contain"
          />
        </div>
      ))}
    </div>
  );
}
