"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, animate, useInView } from "framer-motion";
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

// Pengaturan waktu cetak (detik)
const PRINT_EMERGE = 1.8; // kartu keluar dari celah
const PRINT_FLY = 2.2; // melayang & memantul ke posisinya
const PRINT_STAGGER = 2.2; // jeda antar kartu

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playing = useInView(canvasRef, { once: true, margin: "-10% 0px" });

  // Setiap kartu "dicetak": muncul dari garis celah printer (dipotong clip-path
  // selaras dengan geraknya sehingga tepi atasnya tetap di celah), lalu
  // melayang ke posisinya di scrapbook dengan pantulan spring.
  // Urutan: kartu paling bawah lebih dulu, berakhir di kartu paling atas.
  useEffect(() => {
    if (!playing || !slotRef.current || !canvasRef.current) return;
    let cancelled = false;
    const cards = cardRefs.current;
    const running: { stop: () => void }[] = [];
    const run = <T,>(ctrl: { stop: () => void; then: (cb: () => T) => Promise<T> }) => {
      running.push(ctrl);
      return ctrl;
    };
    const order = GALLERY_IMAGES.map((_, i) => i).sort((a, b) => CARDS[b % CARDS.length].top - CARDS[a % CARDS.length].top);

    (async () => {
      for (const i of order) {
        if (cancelled) return;
        const el = cards[i];
        const c = CARDS[i % CARDS.length];
        const slotEl = slotRef.current;
        const canvasEl = canvasRef.current;
        if (!el || !slotEl || !canvasEl) continue;
        // Posisi akhir kartu dari offset (tidak terpengaruh transform yang sedang
        // berjalan), celah diukur relatif terhadap kanvas pada saat yang sama
        const canvas = canvasEl.getBoundingClientRect();
        const slot = slotEl.getBoundingClientRect();
        const slotTop = slot.top - canvas.top;
        const slotCx = slot.left + slot.width / 2 - canvas.left;
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const dx = slotCx - (el.offsetLeft + w / 2);
        const yHidden = slotTop - el.offsetTop - h;
        const yOut = slotTop - el.offsetTop;
        el.style.zIndex = "60";
        await run(animate(el, { opacity: 1, x: dx, y: yHidden, rotate: 0, clipPath: "inset(100% 0 0 0)" }, { duration: 0 }));
        if (cancelled) return;
        run(animate(el, { y: yOut, clipPath: "inset(0% 0 0 0)" }, { duration: PRINT_EMERGE, ease: "linear" })).then(() => {
          if (cancelled) return;
          run(animate(el, { x: 0, y: 0, rotate: c.rotate }, { type: "spring", bounce: 0.4, duration: PRINT_FLY })).then(() => {
            if (!cancelled) el.style.zIndex = String(c.z);
          });
        });
        await new Promise((res) => setTimeout(res, PRINT_STAGGER * 1000));
      }
    })();
    return () => {
      // Dev StrictMode menjalankan efek dua kali: hentikan animasi yang
      // sedang berjalan dan kembalikan kartu ke keadaan awal
      cancelled = true;
      running.forEach((ctrl) => ctrl.stop());
      cards.forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        el.style.clipPath = "";
        el.style.opacity = "";
      });
    };
  }, [playing]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null));

  return (
    <section className="section bg-moss pb-16">
      <SectionHeader title="Potret Kami" tone="dark" subtitle="Sepenggal momen yang kami abadikan" />

      {/* Printer: kartu-kartu polaroid "dicetak" keluar dari celahnya */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 1, ease: OUT }}
        className="relative mx-auto w-[92%]"
        style={{ aspectRatio: "885 / 306" }}
      >
        <div className="relative z-10">
          <Image src="/images/photobooth/printer.png" alt="" aria-hidden width={885} height={306} className="h-auto w-full" />
        </div>
        {/* Garis celah (46% tinggi printer): acuan posisi keluar kartu */}
        <div ref={slotRef} aria-hidden className="absolute inset-x-[16%] top-[46%] h-0" />
        {/* Bibir atas printer di depan kartu yang sedang keluar */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
          <Image src="/images/photobooth/printer-lip.png" alt="" aria-hidden width={885} height={137} className="h-auto w-full" />
        </div>
      </motion.div>

      <div ref={canvasRef} className="relative z-20 -mt-[2%] w-full [container-type:inline-size]" style={{ aspectRatio: "690 / 2600" }}>
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

        {/* Kartu polaroid: pembungkus dianimasikan (cetak + melayang), tombol di dalamnya untuk hover/tap */}
        {GALLERY_IMAGES.map((img, i) => {
          const c = CARDS[i % CARDS.length];
          return (
            <div
              key={img.src}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute opacity-0"
              style={{ left: `${c.left}%`, top: `${c.top}%`, width: `${c.width}%`, zIndex: c.z }}
            >
              <motion.button
                type="button"
                aria-label={`Lihat ${img.alt}`}
                onClick={() => openLightbox(i)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="relative block w-full bg-[#FAFAF8] p-[2.2%] pb-[7.5%] text-left shadow-[0_10px_26px_rgba(0,0,0,0.35)]"
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
            </div>
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
