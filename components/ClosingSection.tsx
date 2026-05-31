"use client";

import { motion } from "framer-motion";
import { MessageCircle, CalendarPlus, Heart } from "lucide-react";
import { WEDDING_DATA } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/variants";
import FlowerDivider from "@/components/ui/FlowerDivider";
import FloralCorner from "@/components/ui/FloralCorner";

export default function ClosingSection() {
  const shareText = typeof window !== "undefined"
    ? encodeURIComponent(
        `Assalamu'alaikum, kami mengundang Anda ke pernikahan Ari Supriatna & Atikah Sulastri pada ${formatDate(WEDDING_DATA.akad.date)}. Lihat undangan lengkap: ${window.location.origin}`
      )
    : "";

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Pernikahan Ari Supriatna & Atikah Sulastri"
  )}&dates=${WEDDING_DATA.akad.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${WEDDING_DATA.resepsi.date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&location=${encodeURIComponent(WEDDING_DATA.akad.address)}&details=${encodeURIComponent("Pernikahan Ari Supriatna & Atikah Sulastri")}`;

  return (
    <section className="relative bg-gradient-to-b from-petal-light to-blossom/20 py-24 md:py-32 overflow-hidden">
      <FloralCorner position="top-left" size={140} opacity={0.18} />
      <FloralCorner position="top-right" size={140} opacity={0.18} />
      <FloralCorner position="bottom-left" size={110} opacity={0.14} />
      <FloralCorner position="bottom-right" size={110} opacity={0.14} />

      {/* Background circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-blossom/10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border border-sage/10 pointer-events-none" />

      <motion.div
        className="section-container relative z-10 text-center max-w-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainerVariants}
      >
        {/* Wreath illustration */}
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-8">
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
            {/* Left branch */}
            <path d="M10 60 Q20 40 15 20 Q30 30 25 50 Q20 60 10 60Z" fill="#9eb5a3" opacity="0.5" />
            <path d="M20 50 Q35 35 30 18 Q42 28 38 48 Q32 56 20 50Z" fill="#9eb5a3" opacity="0.4" />
            <path d="M5 65 Q15 55 12 42 Q22 50 18 62 Q12 68 5 65Z" fill="#9eb5a3" opacity="0.35" />
            {/* Right branch (mirror) */}
            <path d="M110 60 Q100 40 105 20 Q90 30 95 50 Q100 60 110 60Z" fill="#9eb5a3" opacity="0.5" />
            <path d="M100 50 Q85 35 90 18 Q78 28 82 48 Q88 56 100 50Z" fill="#9eb5a3" opacity="0.4" />
            <path d="M115 65 Q105 55 108 42 Q98 50 102 62 Q108 68 115 65Z" fill="#9eb5a3" opacity="0.35" />
            {/* Center flowers */}
            <circle cx="60" cy="35" r="6" fill="#C9798A" opacity="0.6" />
            <circle cx="52" cy="32" r="4" fill="#C9798A" opacity="0.4" />
            <circle cx="68" cy="32" r="4" fill="#C9798A" opacity="0.4" />
            <circle cx="55" cy="40" r="3" fill="#C9798A" opacity="0.3" />
            <circle cx="65" cy="40" r="3" fill="#C9798A" opacity="0.3" />
            <circle cx="60" cy="35" r="2.5" fill="#FFFBF5" />
            {/* Stem */}
            <path d="M28 58 Q45 52 60 50 Q75 52 92 58" stroke="#9eb5a3" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Names */}
        <motion.h2
          variants={fadeUpVariants}
          className="font-display text-3xl md:text-4xl italic text-ink leading-tight mb-2"
        >
          {WEDDING_DATA.groom.name}
        </motion.h2>
        <motion.p variants={fadeUpVariants} className="font-serif text-2xl text-ink/60 mb-2">
          &
        </motion.p>
        <motion.h2
          variants={fadeUpVariants}
          className="font-display text-3xl md:text-4xl italic text-ink leading-tight"
        >
          {WEDDING_DATA.bride.name}
        </motion.h2>

        <motion.div variants={fadeUpVariants}>
          <FlowerDivider size="sm" className="my-6" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="font-sans text-xs uppercase tracking-[0.3em] text-ink/60 mb-8"
        >
          {formatDate(WEDDING_DATA.akad.date)}
        </motion.p>

        {/* Message */}
        <motion.p
          variants={fadeUpVariants}
          className="font-serif text-sm md:text-base italic text-ink/65 leading-relaxed mb-8"
        >
          Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
          Bapak / Ibu / Saudara / Saudari berkenan hadir untuk memberikan
          doa restu kepada kami.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUpVariants}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          <a
            href={`https://wa.me/?text=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-sans font-medium px-6 py-2.5 rounded-full tracking-widest uppercase text-xs hover:bg-[#1ebe5d] transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
          >
            <MessageCircle size={14} />
            Bagikan via WhatsApp
          </a>
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <CalendarPlus size={14} />
            Simpan ke Kalender
          </a>
        </motion.div>

        <motion.div variants={fadeUpVariants}>
          <FlowerDivider size="sm" className="mb-6" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="font-serif text-lg md:text-xl italic text-ink/70 mb-4"
        >
          Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
        </motion.p>

        {/* Heart */}
        <motion.div
          variants={fadeUpVariants}
          className="flex items-center justify-center gap-2"
        >
          <div className="h-px w-12 bg-blossom/30" />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={16} className="text-blossom fill-blossom" />
          </motion.div>
          <div className="h-px w-12 bg-blossom/30" />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="font-sans text-[10px] text-ink/50 mt-4 tracking-widest"
        >
          Dibuat dengan cinta untuk momen terindah dalam hidup kami
        </motion.p>
      </motion.div>
    </section>
  );
}
