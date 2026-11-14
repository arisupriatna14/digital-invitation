"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface BackgroundCarouselProps {
  images: string[];
  /** Jeda antar gambar (detik) bila lebih dari satu gambar */
  interval?: number;
  /** Kegelapan lapisan di atas gambar, 0-1 */
  dim?: number;
  className?: string;
}

// Latar foto layar penuh: tiap gambar perlahan membesar (efek Ken Burns),
// dan bila ada beberapa gambar, berganti dengan crossfade.
export default function BackgroundCarousel({ images, interval = 7, dim = 0.45, className = "" }: BackgroundCarouselProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), interval * 1000);
    return () => clearInterval(t);
  }, [images.length, interval]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <AnimatePresence initial={false}>
        <motion.div
          key={images[index]}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.6, ease: "easeInOut" },
            scale: { duration: interval + 2, ease: "linear" },
          }}
        />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(30, 34, 20, ${dim})` }} />
    </div>
  );
}
