interface FlowerDividerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function FlowerDivider({ className = "", size = "md" }: FlowerDividerProps) {
  const scale = size === "sm" ? 0.7 : size === "lg" ? 1.3 : 1;

  return (
    <div className={`flex items-center justify-center gap-4 my-6 ${className}`}>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-blossom/40" />
      <svg
        width={Math.round(80 * scale)}
        height={Math.round(32 * scale)}
        viewBox="0 0 80 32"
        fill="none"
      >
        {/* Left small flower */}
        <g transform="translate(8, 16)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 4}
              cy={Math.sin((angle * Math.PI) / 180) * 4}
              rx="3"
              ry="1.8"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 4} ${Math.sin((angle * Math.PI) / 180) * 4})`}
              fill="#C9798A"
              opacity="0.55"
            />
          ))}
          <circle cx="0" cy="0" r="2" fill="#F0B8C4" />
        </g>

        {/* Left leaf */}
        <path d="M20 16 Q24 10 30 13 Q26 17 20 16Z" fill="#87A878" opacity="0.6" />
        <path d="M20 16 Q24 22 30 19 Q26 15 20 16Z" fill="#87A878" opacity="0.45" />

        {/* Center large flower */}
        <g transform="translate(40, 16)">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 6}
              cy={Math.sin((angle * Math.PI) / 180) * 6}
              rx="4.5"
              ry="2.2"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 6} ${Math.sin((angle * Math.PI) / 180) * 6})`}
              fill="#C9798A"
              opacity="0.65"
            />
          ))}
          <circle cx="0" cy="0" r="3" fill="#FFFBF5" />
          <circle cx="0" cy="0" r="1.5" fill="#F0B8C4" />
        </g>

        {/* Right leaf */}
        <path d="M60 16 Q56 10 50 13 Q54 17 60 16Z" fill="#87A878" opacity="0.6" />
        <path d="M60 16 Q56 22 50 19 Q54 15 60 16Z" fill="#87A878" opacity="0.45" />

        {/* Right small flower */}
        <g transform="translate(72, 16)">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <ellipse
              key={i}
              cx={Math.cos((angle * Math.PI) / 180) * 4}
              cy={Math.sin((angle * Math.PI) / 180) * 4}
              rx="3"
              ry="1.8"
              transform={`rotate(${angle} ${Math.cos((angle * Math.PI) / 180) * 4} ${Math.sin((angle * Math.PI) / 180) * 4})`}
              fill="#C9798A"
              opacity="0.55"
            />
          ))}
          <circle cx="0" cy="0" r="2" fill="#F0B8C4" />
        </g>
      </svg>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-blossom/40" />
    </div>
  );
}
