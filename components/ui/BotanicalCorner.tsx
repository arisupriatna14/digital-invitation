interface BotanicalCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
}

export default function BotanicalCorner({
  position,
  size = 120,
  opacity = 0.18,
}: BotanicalCornerProps) {
  const positionClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <div className={`absolute ${positionClass} pointer-events-none`} style={{ opacity }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main stem */}
        <path
          d="M10 110 Q30 80 20 50 Q10 20 30 10"
          stroke="#9eb5a3"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Leaves */}
        <path
          d="M20 85 Q5 75 15 60 Q25 70 20 85Z"
          fill="#9eb5a3"
        />
        <path
          d="M18 65 Q35 55 30 40 Q18 48 18 65Z"
          fill="#9eb5a3"
        />
        <path
          d="M22 45 Q10 35 20 22 Q28 32 22 45Z"
          fill="#9eb5a3"
        />
        {/* Small flower */}
        <circle cx="30" cy="10" r="3" fill="#d2949f" />
        <circle cx="26" cy="7" r="2" fill="#d2949f" opacity="0.7" />
        <circle cx="34" cy="7" r="2" fill="#d2949f" opacity="0.7" />
        <circle cx="26" cy="13" r="2" fill="#d2949f" opacity="0.7" />
        <circle cx="34" cy="13" r="2" fill="#d2949f" opacity="0.7" />
        <circle cx="30" cy="10" r="1.5" fill="#f2e5c5" />
        {/* Secondary branch */}
        <path
          d="M15 95 Q40 90 50 75"
          stroke="#9eb5a3"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M35 85 Q48 78 50 68 Q38 72 35 85Z"
          fill="#9eb5a3"
          opacity="0.6"
        />
        {/* Small dots */}
        <circle cx="50" cy="74" r="1.5" fill="#d2949f" opacity="0.5" />
        <circle cx="55" cy="70" r="1" fill="#d2949f" opacity="0.4" />
      </svg>
    </div>
  );
}
