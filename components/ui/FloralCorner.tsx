interface FloralCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
}

export default function FloralCorner({
  position,
  size = 160,
  opacity = 0.85,
}: FloralCornerProps) {
  const positionClass = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0 scale-x-[-1]",
    "bottom-left": "bottom-0 left-0 scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-x-[-1] scale-y-[-1]",
  }[position];

  return (
    <div
      className={`absolute ${positionClass} pointer-events-none`}
      style={{ opacity }}
    >
      <svg width={size} height={size} viewBox="0 0 160 160" fill="none">
        {/* Main curving stem */}
        <path
          d="M8 152 C20 120, 15 80, 30 55 C45 30, 65 20, 75 8"
          stroke="#87A878"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Secondary branch right */}
        <path
          d="M28 100 C45 88, 60 85, 72 72"
          stroke="#87A878"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        />
        {/* Secondary branch left */}
        <path
          d="M18 130 C8 118, 5 105, 10 90"
          stroke="#87A878"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Large leaves */}
        <path d="M22 112 C8 98, 5 78, 20 72 C28 88, 28 100, 22 112Z" fill="#87A878" opacity="0.55" />
        <path d="M32 85 C48 70, 65 68, 68 56 C52 55, 38 65, 32 85Z" fill="#87A878" opacity="0.5" />
        <path d="M12 138 C2 128, 0 115, 10 108 C15 120, 15 130, 12 138Z" fill="#87A878" opacity="0.4" />
        {/* Small leaf on branch */}
        <path d="M52 92 C62 82, 72 82, 74 74 C62 72, 54 80, 52 92Z" fill="#B5CCA9" opacity="0.6" />
        <path d="M40 106 C28 100, 22 90, 28 82 C36 88, 40 98, 40 106Z" fill="#B5CCA9" opacity="0.5" />

        {/* Rose at top */}
        <g transform="translate(75, 8)">
          <circle cx="0" cy="0" r="7" fill="#C9798A" opacity="0.3" />
          <ellipse cx="0" cy="-5" rx="4" ry="6" fill="#C9798A" opacity="0.7" />
          <ellipse cx="4.3" cy="2.5" rx="4" ry="6" transform="rotate(120)" fill="#C9798A" opacity="0.65" />
          <ellipse cx="-4.3" cy="2.5" rx="4" ry="6" transform="rotate(240)" fill="#C9798A" opacity="0.65" />
          <ellipse cx="0" cy="-3" rx="2.5" ry="4" fill="#F0B8C4" opacity="0.8" />
          <ellipse cx="2.6" cy="1.5" rx="2.5" ry="4" transform="rotate(120)" fill="#F0B8C4" opacity="0.75" />
          <ellipse cx="-2.6" cy="1.5" rx="2.5" ry="4" transform="rotate(240)" fill="#F0B8C4" opacity="0.75" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFBF5" />
        </g>

        {/* Medium rose on branch */}
        <g transform="translate(70, 70)">
          <ellipse cx="0" cy="-4" rx="3" ry="4.5" fill="#C9798A" opacity="0.7" />
          <ellipse cx="3.9" cy="2" rx="3" ry="4.5" transform="rotate(120)" fill="#C9798A" opacity="0.65" />
          <ellipse cx="-3.9" cy="2" rx="3" ry="4.5" transform="rotate(240)" fill="#C9798A" opacity="0.65" />
          <ellipse cx="0" cy="-2.5" rx="2" ry="3" fill="#F0B8C4" opacity="0.8" />
          <ellipse cx="2.2" cy="1.2" rx="2" ry="3" transform="rotate(120)" fill="#F0B8C4" opacity="0.75" />
          <ellipse cx="-2.2" cy="1.2" rx="2" ry="3" transform="rotate(240)" fill="#F0B8C4" opacity="0.75" />
          <circle cx="0" cy="0" r="1.8" fill="#FFFBF5" />
        </g>

        {/* Small flowers / buds */}
        <g transform="translate(26, 58)">
          {[0, 72, 144, 216, 288].map((a, i) => (
            <ellipse
              key={i}
              cx={Math.cos((a * Math.PI) / 180) * 3.5}
              cy={Math.sin((a * Math.PI) / 180) * 3.5}
              rx="2.5" ry="1.5"
              transform={`rotate(${a} ${Math.cos((a * Math.PI) / 180) * 3.5} ${Math.sin((a * Math.PI) / 180) * 3.5})`}
              fill="#C9798A" opacity="0.6"
            />
          ))}
          <circle cx="0" cy="0" r="1.5" fill="#F0B8C4" />
        </g>

        <g transform="translate(10, 90)">
          {[0, 72, 144, 216, 288].map((a, i) => (
            <ellipse
              key={i}
              cx={Math.cos((a * Math.PI) / 180) * 3}
              cy={Math.sin((a * Math.PI) / 180) * 3}
              rx="2" ry="1.2"
              transform={`rotate(${a} ${Math.cos((a * Math.PI) / 180) * 3} ${Math.sin((a * Math.PI) / 180) * 3})`}
              fill="#F0B8C4" opacity="0.7"
            />
          ))}
          <circle cx="0" cy="0" r="1.2" fill="#FFFBF5" />
        </g>

        {/* Tiny dots / berries */}
        <circle cx="42" cy="78" r="2" fill="#C9798A" opacity="0.4" />
        <circle cx="38" cy="72" r="1.5" fill="#C9798A" opacity="0.35" />
        <circle cx="47" cy="73" r="1.5" fill="#F0B8C4" opacity="0.5" />
        <circle cx="16" cy="120" r="2" fill="#B5CCA9" opacity="0.5" />
        <circle cx="20" cy="114" r="1.5" fill="#B5CCA9" opacity="0.4" />
      </svg>
    </div>
  );
}
