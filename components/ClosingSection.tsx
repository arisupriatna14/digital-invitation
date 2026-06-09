"use client";

import { motion } from "framer-motion";
import { MessageCircle, CalendarPlus, Heart } from "lucide-react";
import BouquetCluster from "@/components/ui/BouquetCluster";
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
      <FloralCorner position="top-left" size={200} opacity={0.18} />
      <FloralCorner position="top-right" size={200} opacity={0.18} />
      <FloralCorner position="bottom-left" size={160} opacity={0.14} />
      <FloralCorner position="bottom-right" size={160} opacity={0.14} />

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
        {/* Bouquet illustration */}
        <motion.div variants={fadeUpVariants} className="flex justify-center mb-8">
          <BouquetCluster width={300} src="/images/flowers/bouquet-2.png" />
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
