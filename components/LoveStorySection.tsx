"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Polaroid from "@/components/ornaments/Polaroid";
import Reveal from "@/components/ornaments/Reveal";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

// Satu buket menjuntai per bab, menempel di atas garis sobek kartu
// di sisi yang berlawanan dengan polaroid. tuck = seberapa jauh bagian atas
// buket naik menimpa tepi bawah kartu (persen tinggi buket).
const ORNAMENTS = [
  // Bab 1 (foto kanan): buket campur calla, anthurium pink & orkid di kiri
  { src: "/images/couple/bouquet-mixed.png", w: 450, h: 842, className: "left-[1%] w-[34%]", tuck: 24, rotate: -4 },
  // Bab 2 (foto kiri): buket calla putih panjang dengan amaranthus di kanan
  { src: "/images/closing/calla-white-spray.png", w: 687, h: 1031, className: "right-[-7%] w-[54%]", tuck: 28, rotate: 4 },
  // Bab 3 (foto kanan): buket calla putih & anthurium hijau di kiri
  { src: "/images/cover/bouquet-calla.png", w: 560, h: 700, className: "left-[-7%] w-[54%]", tuck: 26, rotate: -6 },
];

export default function LoveStorySection() {
  return (
    <section className="section bg-moss">
      <SectionHeader title="Kisah Cinta Kami" tone="dark" />

      <div className="space-y-20">
        {WEDDING_DATA.loveStory.map((chapter, i) => {
          const flip = i % 2 === 1;
          const o = ORNAMENTS[i % ORNAMENTS.length];
          return (
            <div key={chapter.title} className="relative">
              {/* Kartu kertas sobek + buket yang menempel di garis sobeknya */}
              <div className="relative">
                <Reveal
                  from="up"
                  className="relative mx-2 bg-gradient-to-b from-ivory-light to-ivory torn-bottom px-6 pt-6 pb-24 text-center shadow-lg"
                >
                  <h3 className="font-serif text-lg text-olive">{chapter.title}</h3>
                  <p className="font-serif text-[16px] leading-snug text-olive/70 mt-2">{chapter.text}</p>
                </Reveal>
                <motion.div
                  initial={{ opacity: 0, y: -40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={VIEW}
                  transition={{ duration: 1.8, ease: OUT, delay: 0.5 }}
                  className={`pointer-events-none absolute top-full z-30 ${o.className}`}
                  style={{ marginTop: `-${o.tuck}%` }}
                >
                  <motion.div
                    animate={{ rotate: [o.rotate - 2, o.rotate + 2, o.rotate - 2] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
                    className="origin-top"
                  >
                    <Image src={o.src} alt="" aria-hidden width={o.w} height={o.h} className="h-auto w-full" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Polaroid menumpuk di bawah kartu */}
              <div className={`relative z-20 -mt-14 flex ${flip ? "justify-start pl-4" : "justify-end pr-2"}`}>
                <Polaroid src={chapter.photo} alt={chapter.title} rotate={flip ? -7 : 9} stacked className="w-[46%]" delay={0.2} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
