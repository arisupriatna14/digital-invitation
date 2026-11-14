"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_IMAGES, EASE } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

// Tata letak scrapbook: polaroid miring bertumpuk zig-zag.
// Posisi dalam persen terhadap kanvas desain 690 x 2600.
// tape: posisi selotip washi di tepi atas kartu.
const CARDS = [
  { left: 4, top: 0, width: 52, rotate: -5, tape: "left", z: 10 },
  { left: 50, top: 5, width: 46, rotate: 6, tape: "right", z: 20 },
  { left: 20, top: 23, width: 56, rotate: 2, tape: "center", z: 20 },
  { left: 2, top: 44, width: 44, rotate: -7, tape: "left", z: 10 },
  { left: 44, top: 46, width: 52, rotate: 4, tape: "right", z: 20 },
  { left: 10, top: 63, width: 48, rotate: -3, tape: "center", z: 20 },
  { left: 52, top: 67, width: 44, rotate: 7, tape: "right", z: 10 },
  { left: 4, top: 83, width: 44, rotate: 5, tape: "left", z: 10 },
  { left: 48, top: 81, width: 50, rotate: -4, tape: "center", z: 20 },
] as const;

const TAPE_POS = { left: "left-[8%]", center: "left-1/2 -translate-x-1/2", right: "right-[8%]" };

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null));

  return (
    <section className="section bg-olive pb-16">
      <SectionHeader title="Potret Kami" tone="dark" subtitle="Sepenggal momen yang kami abadikan" />

      <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: "690 / 2600" }}>
        {/* Ornamen di sela-sela foto */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.4 }}
          className="pointer-events-none absolute left-[-4%] top-[22%] z-30 w-[24%]"
        >
          <Image src="/images/quran/lily.png" alt="" aria-hidden width={342} height={341} className="h-auto w-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.4 }}
          className="pointer-events-none absolute left-[74%] top-[33%] z-30 w-[20%]"
        >
          <motion.div animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="origin-bottom">
            <Image src="/images/countdown/anthurium-single.png" alt="" aria-hidden width={234} height={405} className="h-auto w-full" />
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.4 }}
          className="pointer-events-none absolute left-[-3%] top-[62%] z-30 w-[22%]"
        >
          <Image src="/images/cover/anthurium-pink.png" alt="" aria-hidden width={275} height={432} className="h-auto w-full" />
        </motion.div>

        {/* Kartu polaroid */}
        {GALLERY_IMAGES.map((img, i) => {
          const c = CARDS[i % CARDS.length];
          return (
            <motion.button
              key={img.src}
              type="button"
              aria-label={`Lihat ${img.alt}`}
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0, y: 50, rotate: c.rotate - 6 }}
              whileInView={{ opacity: 1, y: 0, rotate: c.rotate }}
              viewport={VIEW}
              whileHover={{ scale: 1.04, rotate: 0, zIndex: 40 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 1.1, ease: OUT, delay: (i % 2) * 0.15 }}
              className="absolute block bg-[#FAFAF8] p-[2.2%] pb-[7.5%] text-left shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
              style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, zIndex: c.z }}
            >
              {/* Selotip washi */}
              <span
                aria-hidden
                className={`absolute -top-[2.5%] ${TAPE_POS[c.tape]} z-10 h-[4.5cqw] w-[13cqw] rotate-[-4deg] bg-[#D9CBA8]/80 shadow-sm`}
                style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.25) 6px 8px)" }}
              />
              <div className="relative w-full overflow-hidden" style={{ paddingBottom: "125%" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "center 35%" }} loading="lazy" />
              </div>
              <span className="mt-[3%] block font-typewriter text-[2.6cqw] text-olive/60">
                {String(i + 1).padStart(2, "0")} / {String(GALLERY_IMAGES.length).padStart(2, "0")}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.IN_OUT_SINE }}
            className="fixed inset-0 bg-olive/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: EASE.OUT_EXPO }}
                className="max-w-[80vw] max-h-[80vh] object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-1.5">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === lightboxIndex ? "bg-cream-light w-4" : "bg-cream-light/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
