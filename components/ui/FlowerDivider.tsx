import Image from "next/image";

interface FlowerDividerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

// Aspek rasio aset garland (lihat public/images/flowers/garland.png)
const ASPECT = 191 / 700;

export default function FlowerDivider({ className = "", size = "md" }: FlowerDividerProps) {
  const width = size === "sm" ? 130 : size === "lg" ? 240 : 180;
  const height = Math.round(width * ASPECT);

  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="h-px flex-1 max-w-[64px] bg-gradient-to-r from-transparent to-blossom/30" />
      <Image
        src="/images/flowers/garland.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        style={{ width, height }}
        className="select-none"
      />
      <div className="h-px flex-1 max-w-[64px] bg-gradient-to-l from-transparent to-blossom/30" />
    </div>
  );
}
