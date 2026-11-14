"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Aset watercolor di public/images/flowers dengan ukuran aslinya
const ASSETS = {
  bouquet: [480, 430],
  "bouquet-2": [520, 466],
  carnation: [280, 328],
  garland: [700, 191],
  "garland-long": [1000, 223],
  peony: [360, 308],
  primrose: [300, 298],
  tulip: [280, 281],
  "leaf-green": [104, 199],
  "leaf-olive": [220, 325],
  "leaf-olive-small": [130, 169],
  "leaf-pink": [160, 288],
  "leaf-pink-sprig": [185, 298],
  "leaf-sage": [200, 290],
  "leaf-sage-sprig": [210, 370],
} as const;

export type FlowerName = keyof typeof ASSETS;

interface FlowerProps {
  name: FlowerName;
  width: number;
  /** Kelas posisi, mis. "absolute -top-6 -left-8" */
  className?: string;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
  /** Arah masuk animasi saat terlihat */
  from?: "left" | "right" | "up" | "down" | "zoom";
  delay?: number;
  /** Bunga bergoyang pelan setelah muncul */
  sway?: boolean;
}

const OFFSET = {
  left: { x: -40, y: 20 },
  right: { x: 40, y: 20 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  zoom: { x: 0, y: 0 },
};

// Ornamen bunga watercolor yang muncul saat di-scroll (meniru efek AOS referensi).
export default function Flower({
  name,
  width,
  className = "absolute",
  rotate = 0,
  flipX = false,
  flipY = false,
  from = "up",
  delay = 0,
  sway = false,
}: FlowerProps) {
  const [w, h] = ASSETS[name];
  const height = Math.round((width * h) / w);

  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, scale: from === "zoom" ? 0.6 : 1, ...OFFSET[from] }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1], delay }}
      style={{ width, height }}
    >
      <div
        className={sway ? "animate-sway origin-bottom" : undefined}
        style={{ width, height }}
      >
        <Image
          src={`/images/flowers/${name}.png`}
          alt=""
          aria-hidden
          width={width}
          height={height}
          style={{
            width,
            height,
            transform: `rotate(${rotate}deg) scale(${flipX ? -1 : 1}, ${flipY ? -1 : 1})`,
          }}
        />
      </div>
    </motion.div>
  );
}
