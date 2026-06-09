import Image from "next/image";

interface FloralCornerProps {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  opacity?: number;
}

// Aspek rasio aset bouquet (lihat public/images/flowers/bouquet.png)
const ASPECT = 430 / 480;

export default function FloralCorner({
  position,
  size = 160,
  opacity = 0.85,
}: FloralCornerProps) {
  // Orientasi asli aset cocok untuk pojok kanan-atas; pojok lain dicerminkan.
  const positionClass = {
    "top-left": "top-0 left-0 scale-x-[-1]",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0 scale-x-[-1] scale-y-[-1]",
    "bottom-right": "bottom-0 right-0 scale-y-[-1]",
  }[position];

  const width = size;
  const height = Math.round(size * ASPECT);

  return (
    <div
      className={`absolute ${positionClass} pointer-events-none select-none`}
      style={{ opacity }}
    >
      <Image
        src="/images/flowers/bouquet.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
        className="h-auto w-auto"
        style={{ width, height }}
        priority={false}
      />
    </div>
  );
}
