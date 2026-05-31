"use client";

import { useState, useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { EASE } from "@/lib/constants";

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [scope, animate] = useAnimate();
  const [guestName, setGuestName] = useState<string>("");
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("to");
      if (name) setGuestName(decodeURIComponent(name));
    }
  }, []);

  const handleOpen = async () => {
    if (isOpening) return;
    setIsOpening(true);

    // Tahap 1 + 2 paralel: Flap terbuka & surat naik bersamaan
    animate("#flap", { rotateX: -175 }, { duration: 0.75, ease: EASE.OUT_EXPO });
    await animate(
      "#letter",
      { y: -100, opacity: 0 },
      { duration: 0.65, ease: EASE.OUT_CIRC }
    );

    // Tahap 3: Amplop mengecil dan hilang
    await animate(
      "#envelope-wrapper",
      { scale: 0.72, opacity: 0, y: 30 },
      { duration: 0.5, ease: EASE.IN_OUT_SINE }
    );

    // Tahap 4: Overlay putih fade in
    await animate(
      "#overlay",
      { opacity: 1 },
      { duration: 0.45, ease: EASE.IN_OUT_SINE }
    );

    onOpen();
  };

  return (
    <div ref={scope} className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-petal overflow-hidden">
      {/* Floating petals on envelope screen */}
      {[0, 1, 2, 3].map((i) => (
        <svg
          key={i}
          className={`absolute petal ${i % 2 === 0 ? "animate-float-petal" : "animate-float-petal-left"}`}
          style={{
            left: `${15 + i * 22}%`,
            top: "-5%",
            animationDelay: `${i * 2}s`,
            animationDuration: `${9 + i}s`,
            width: 12,
            height: 18,
            opacity: 0,
          }}
          viewBox="0 0 12 18"
        >
          <path d="M6 0 C10 4, 12 9, 6 18 C0 9, 2 4, 6 0Z" fill="#C9798A" opacity="0.5" />
        </svg>
      ))}

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-32 rounded-full border border-blossom/20" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full border border-blossom/20" />
      <div className="absolute top-1/3 right-8 w-16 h-16 rounded-full border border-sage/15" />

      {/* Guest name */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.OUT_QUART, delay: 0.3 }}
        className="text-center mb-8 z-10"
      >
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-ink/40 mb-1">
          Kepada Yth.
        </p>
        <p className="font-serif text-xl italic text-ink/75">
          {guestName || "Tamu Undangan"}
        </p>
      </motion.div>

      {/* Envelope */}
      <div id="envelope-wrapper" className="relative z-10" style={{ perspective: "800px" }}>
        <div className="relative w-72 h-48 md:w-80 md:h-52">
          {/* Letter peeking out */}
          <div
            id="letter"
            className="absolute left-1/2 -translate-x-1/2 -top-6 w-56 h-32 bg-cream-light rounded-t-lg shadow-md flex items-center justify-center z-0"
          >
            <div className="text-center px-4">
              <p className="font-serif text-xs italic text-blossom/60">
                بِسْمِ اللَّهِ
              </p>
              <p className="font-display text-sm italic text-ink/70 mt-1">
                Ari & Atikah
              </p>
              <div className="w-8 h-px bg-blossom/40 mx-auto mt-2" />
            </div>
          </div>

          {/* Envelope body */}
          <div className="absolute inset-0 bg-cream-light rounded-b-xl rounded-t-none z-10 border-2 border-cream-dark/20 shadow-2xl">
            {/* Envelope inner lines */}
            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-20">
              <div className="w-full h-px bg-blossom" style={{ transform: "rotate(12deg)", transformOrigin: "left center", width: "70%" }} />
            </div>
            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-20">
              <div className="w-full h-px bg-blossom" style={{ transform: "rotate(-12deg)", transformOrigin: "right center", width: "70%" }} />
            </div>
            {/* Seal */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-blossom/10 border border-blossom/20 flex items-center justify-center">
              <span className="font-display text-xs italic text-blossom/60">A</span>
            </div>
          </div>

          {/* Envelope flap (top triangle) */}
          <div
            id="flap"
            className="absolute top-0 left-0 right-0 z-20 origin-top"
            style={{
              height: "60%",
              clipPath: "polygon(0 0, 50% 55%, 100% 0)",
              background: "linear-gradient(180deg, #F5CDD7 0%, #FDE8EE 100%)",
              borderRadius: "inherit",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          />

          {/* Envelope flap back (visible when flap opens) */}
          <div
            className="absolute top-0 left-0 right-0 z-10"
            style={{
              height: "60%",
              clipPath: "polygon(0 0, 50% 55%, 100% 0)",
              background: "linear-gradient(180deg, #bdd0c4 0%, #9eb5a3 100%)",
              opacity: 0.4,
            }}
          />
        </div>
      </div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE.OUT_QUART, delay: 0.6 }}
        className="mt-10 z-10 text-center"
      >
        <button
          onClick={handleOpen}
          disabled={isOpening}
          className="relative group btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOpening ? (
            <span className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block w-3 h-3 border border-cream-light/40 border-t-cream-light rounded-full"
              />
              Membuka...
            </span>
          ) : (
            "Buka Undangan"
          )}
          {/* Pulse ring on button */}
          {!isOpening && (
            <motion.span
              className="absolute inset-0 rounded-full border border-ink/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </button>
        <p className="font-sans text-xs text-ink/35 mt-3 tracking-widest">
          Klik untuk membuka undangan
        </p>
      </motion.div>

      {/* White overlay for transition */}
      <div
        id="overlay"
        className="absolute inset-0 bg-cream pointer-events-none z-40"
        style={{ opacity: 0 }}
      />
    </div>
  );
}
