"use client";

import { motion } from "framer-motion";
import Photo from "./Photo";

interface PolaroidProps {
  src?: string;
  alt?: string;
  rotate?: number;
  /** Kelas ukuran & posisi kartu */
  className?: string;
  /** Rasio foto (tinggi/lebar) */
  ratio?: number;
  /** Tumpukan kartu kedua di belakang */
  stacked?: boolean;
  delay?: number;
}

// Kartu foto bergaya polaroid, sedikit miring, muncul saat di-scroll.
export default function Polaroid({
  src,
  alt,
  rotate = 0,
  className = "",
  ratio = 1.25,
  stacked = false,
  delay = 0,
}: PolaroidProps) {
  return (
    <motion.div
      className={className.includes("absolute") ? className : `relative ${className}`}
      initial={{ opacity: 0, y: 40, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-40px 0px" }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay }}
    >
      {stacked && (
        <div className="absolute inset-0 bg-[#F4F3EF] shadow-md rotate-[5deg] translate-x-2" aria-hidden />
      )}
      <div className="relative bg-[#FAFAF8] p-[6%] pb-[20%] shadow-[0_8px_20px_rgba(0,0,0,0.2)]">
        <div className="relative w-full" style={{ paddingBottom: `${ratio * 100}%` }}>
          <Photo src={src} alt={alt} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </motion.div>
  );
}
