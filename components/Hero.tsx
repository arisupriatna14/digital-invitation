"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroContainerVariants, nameVariants, ampersandVariants, fadeUpVariants } from "@/lib/variants";
import { WEDDING_DATA } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import CountdownTimer from "@/components/ui/CountdownTimer";
import FlowerDivider from "@/components/ui/FlowerDivider";
import FloralCorner from "@/components/ui/FloralCorner";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const cornerY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-petal overflow-hidden"
    >
      {/* Floral corners with parallax */}
      <motion.div style={{ y: cornerY }} className="absolute inset-0 pointer-events-none">
        <FloralCorner position="top-left" size={170} opacity={0.9} />
        <FloralCorner position="top-right" size={170} opacity={0.9} />
        <FloralCorner position="bottom-left" size={130} opacity={0.7} />
        <FloralCorner position="bottom-right" size={130} opacity={0.7} />
      </motion.div>

      {/* Subtle radial glow center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#FFFBF5_0%,_transparent_65%)] pointer-events-none opacity-60" />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center px-8 py-20 max-w-md mx-auto"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUpVariants} className="font-serif text-sm italic text-blossom/80 mb-5 tracking-wide">
          Bismillahirrahmanirrahim
        </motion.p>

        <motion.p variants={fadeUpVariants} className="font-sans text-[10px] uppercase tracking-[0.45em] text-ink/40 mb-7">
          Undangan Pernikahan
        </motion.p>

        <motion.h1 variants={nameVariants} className="font-display text-4xl md:text-6xl italic text-ink leading-tight">
          {WEDDING_DATA.groom.name}
        </motion.h1>

        <motion.div variants={ampersandVariants} className="my-2">
          <span className="font-serif text-5xl md:text-6xl text-blossom leading-none block">
            &amp;
          </span>
        </motion.div>

        <motion.h1 variants={nameVariants} className="font-display text-4xl md:text-6xl italic text-ink leading-tight">
          {WEDDING_DATA.bride.name}
        </motion.h1>

        <motion.div variants={fadeUpVariants}>
          <FlowerDivider className="my-5" />
        </motion.div>

        <motion.p variants={fadeUpVariants} className="font-sans text-[10px] uppercase tracking-[0.35em] text-ink/50 mb-8">
          {formatDate(WEDDING_DATA.akad.date)}
        </motion.p>

        <motion.div variants={fadeUpVariants}>
          <CountdownTimer targetDate={WEDDING_DATA.akad.date} />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-ink/35">Gulir ke bawah</p>
          <ChevronDown size={16} className="text-ink/35" />
        </motion.div>
      </motion.div>
    </section>
  );
}
