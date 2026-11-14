"use client";

import { motion } from "framer-motion";
import { WEDDING_DATA, EASE, BACKGROUND_IMAGES } from "@/lib/constants";
import BackgroundCarousel from "@/components/ornaments/BackgroundCarousel";
import LaceFrame from "@/components/ornaments/LaceFrame";
import Photo from "@/components/ornaments/Photo";

export default function Hero() {
  const g = WEDDING_DATA.groom.nickname;
  const b = WEDDING_DATA.bride.nickname;

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center bg-olive overflow-hidden px-6 py-16 text-ivory-light">
      <BackgroundCarousel images={BACKGROUND_IMAGES} dim={0.4} />
      {/* Monogram */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: EASE.OUT_QUART, delay: 0.3 }}
        className="relative z-10 h-28 w-40 text-center"
      >
        <span className="absolute left-6 top-0 font-script text-[92px] leading-none">{g.charAt(0)}</span>
        <span className="absolute right-6 top-6 font-script text-[92px] leading-none">{b.charAt(0)}</span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.8 }}
        className="relative z-10 font-serif text-base mt-4 tracking-wide"
      >
        Undangan Pernikahan
      </motion.p>

      {/* Foto dalam bingkai renda oval */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE.OUT_EXPO, delay: 1 }}
        className="relative z-10 mt-8"
      >
        <LaceFrame shape="oval" band={22} className="w-[320px] h-[250px]">
          <div className="w-[260px] h-[190px] overflow-hidden rounded-[50%]">
            {/* Sedikit diperbesar lalu digeser ke kanan agar pasangan tepat di tengah oval */}
            <Photo src={WEDDING_DATA.photos.hero} alt="Foto mempelai" position="center 68%" className="w-full h-full scale-[1.15] translate-x-[4%]" />
          </div>
        </LaceFrame>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: EASE.OUT_QUART, delay: 1.8 }}
        className="relative z-10 font-script text-5xl mt-12 text-center"
      >
        {g} &amp; {b}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 2.4 }}
        className="relative z-10 font-serif text-base mt-4"
      >
        {WEDDING_DATA.hashtag}
      </motion.p>
    </section>
  );
}
