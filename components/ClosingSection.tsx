"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";
import WaxSeal from "@/components/ornaments/WaxSeal";
import Flourish from "@/components/ornaments/Flourish";
import Reveal from "@/components/ornaments/Reveal";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

// Ornamen diukur dari gambar desain (686 x 1190). Sisi kanan adalah cerminan sisi kiri,
// tetapi animasinya dibuat berbeda (waktu masuk, arah, dan fase goyangan) agar tidak serempak.
const ORNAMENTS = [
  // Buket calla putih di sudut atas
  { src: "/images/closing/calla-white-spray.png", w: 687, h: 1031, left: -6, top: 9.2, width: 42, rotate: -6, origin: "origin-bottom", from: { x: -30, y: -20 }, delay: 0.2, duration: 1.5, sway: 6.5 },
  { src: "/images/closing/calla-white-spray.png", w: 687, h: 1031, left: 64, top: 9.2, width: 42, rotate: 6, origin: "origin-bottom", from: { x: 30, y: 10 }, delay: 0.7, duration: 1.9, sway: 8, reverse: true, flip: true },
  // Calla pink di sisi tengah
  { src: "/images/closing/calla-pink-spray.png", w: 600, h: 1066, left: -7, top: 46.9, width: 38.7, rotate: 0, origin: "origin-bottom", from: { x: -40, y: 20 }, delay: 0.4, duration: 1.6, sway: 7 },
  { src: "/images/closing/calla-pink-spray.png", w: 600, h: 1066, left: 68.3, top: 46.9, width: 38.7, rotate: 0, origin: "origin-bottom", from: { x: 40, y: -10 }, delay: 0.9, duration: 2.0, sway: 5.5, reverse: true, flip: true },
  // Rangkaian bunga pink di bawah
  { src: "/images/closing/pink-cluster.png", w: 917, h: 516, left: -3, top: 75.3, width: 67, rotate: 0, origin: "origin-bottom", from: { x: -20, y: 30 }, delay: 0.6, duration: 1.6, sway: 7.5 },
  { src: "/images/closing/pink-cluster.png", w: 917, h: 516, left: 36, top: 75.3, width: 67, rotate: 0, origin: "origin-bottom", from: { x: 20, y: 40 }, delay: 1.1, duration: 2.1, sway: 6, reverse: true, flip: true },
];

export default function ClosingSection() {
  const { groom, bride } = WEDDING_DATA;

  return (
    <section className="relative bg-moss pt-6 pb-10 overflow-hidden">
      <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: "686 / 1090" }}>
        {/* Lace frame sebagai latar tulisan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.3, ease: OUT }}
          className="absolute left-[-2%] top-[9.8%] z-10 w-[102.5%]"
        >
          <Image
            src="/images/closing/lace-frame.png"
            alt=""
            aria-hidden
            width={831}
            height={1100}
            className="h-auto w-full"
            sizes="(max-width: 480px) 100vw, 500px"
          />
        </motion.div>

        {/* Isi teks, di dalam area krem frame dan di antara ornamen */}
        <div className="absolute left-[20%] top-[21%] z-20 flex h-[54%] w-[60%] flex-col items-center justify-center text-center text-olive">
          <Reveal from="zoom">
            <WaxSeal size={76} initials={[groom.nickname.charAt(0), bride.nickname.charAt(0)]} />
          </Reveal>
          <Reveal as="h2" delay={0.1} className="font-script text-[10cqw] leading-none mt-[3cqw]">
            Terima Kasih!
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-[3.5cqw] font-serif text-[3.2cqw] leading-[1.35]">
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i
            berkenan hadir dan memberikan doa restu kepada kami.
          </Reveal>
          <Reveal as="p" delay={0.3} className="mt-[3.5cqw] font-serif italic text-[3.2cqw] leading-[1.35]">
            Wassalamu&apos;alaikum Warahmatullahi Wabarakatuh
          </Reveal>
          <Reveal as="p" delay={0.4} className="mt-[3.5cqw] font-script text-[7.5cqw] leading-none">
            {groom.nickname} &amp; {bride.nickname}
          </Reveal>
          <Reveal delay={0.5} className="mt-[3.5cqw] text-olive/70">
            <Flourish width={56} />
          </Reveal>
        </div>

        {ORNAMENTS.map((o, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, ...o.from }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={VIEW}
            transition={{ duration: o.duration, ease: OUT, delay: o.delay }}
            className="pointer-events-none absolute z-30"
            style={{ left: `${o.left}%`, top: `${o.top}%`, width: `${o.width}%` }}
          >
            <motion.div
              animate={{ rotate: o.reverse ? [o.rotate + 2, o.rotate - 2, o.rotate + 2] : [o.rotate - 2, o.rotate + 2, o.rotate - 2] }}
              transition={{ duration: o.sway, repeat: Infinity, ease: "easeInOut", delay: o.reverse ? 1.2 : 0 }}
              className={o.origin}
            >
              <Image
                src={o.src}
                alt=""
                aria-hidden
                width={o.w}
                height={o.h}
                className={`h-auto w-full ${o.flip ? "-scale-x-100" : ""}`}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
