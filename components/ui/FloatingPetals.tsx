"use client";

const PETALS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  left: `${i * 6.5}%`,
  delay: `${i * 1.05}s`,
  duration: `${9 + (i % 4) * 1.5}s`,
  isLeft: i % 2 === 0,
  type: i % 3,
}));

function PetalSVG({ type }: { type: number }) {
  if (type === 0) {
    // Cherry blossom petal
    return (
      <svg viewBox="0 0 14 18" fill="none">
        <path d="M7 1 C11 3, 13 8, 10 14 C8 17, 5 17, 4 14 C1 8, 3 3, 7 1Z" fill="#C9798A" opacity="0.45" />
        <path d="M7 1 C7 6, 8 11, 10 14" stroke="#F0B8C4" strokeWidth="0.5" opacity="0.4" />
      </svg>
    );
  }
  if (type === 1) {
    // Round petal
    return (
      <svg viewBox="0 0 12 16" fill="none">
        <ellipse cx="6" cy="9" rx="5" ry="7" fill="#F0B8C4" opacity="0.5" />
      </svg>
    );
  }
  // Leaf
  return (
    <svg viewBox="0 0 10 16" fill="none">
      <path d="M5 0 C9 4, 10 9, 5 16 C0 9, 1 4, 5 0Z" fill="#87A878" opacity="0.35" />
    </svg>
  );
}

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
            width: 10 + (p.id % 3) * 3,
            height: 14 + (p.id % 3) * 4,
          }}
        >
          <PetalSVG type={p.type} />
        </div>
      ))}
    </div>
  );
}
