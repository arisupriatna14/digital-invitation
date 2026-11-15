"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";

const OUT = [0.19, 1, 0.22, 1] as const;

// Strip foto: 652 x 1933 (rasio 2.965). Lebar strip 58% dari lebar printer,
// tingginya 58 * 2.965 = 172 cqw + jarak antar strip 3 cqw = pitch 175 cqw
// (relatif terhadap lebar printer).
const STRIP_H = "175cqw";
// Urutan strip dari atas ke bawah; yang paling bawah keluar lebih dulu.
// Pola pink-olive berulang supaya loop-nya mulus (periode = 2 strip).
const STRIPS = ["pink", "olive", "pink", "olive", "pink"] as const;
// Durasi satu strip keluar penuh: 4 langkah x (diam 1,8 s + geser 0,9 s)
const SECONDS_PER_STRIP = 4 * 2.7;

// Bintang & titik pastel di latar (posisi dalam persen, deterministik)
const SPARKLES = [
  { x: 8, y: 6, s: 14, c: "#F0B8C4", star: true, d: 0 },
  { x: 30, y: 3, s: 8, c: "#BBD7F2", star: true, d: 1.2 },
  { x: 55, y: 8, s: 6, c: "#F3E2A0", star: false, d: 0.6 },
  { x: 86, y: 5, s: 12, c: "#C8DDB0", star: true, d: 2 },
  { x: 94, y: 16, s: 7, c: "#F0B8C4", star: false, d: 1.6 },
  { x: 4, y: 20, s: 8, c: "#F3E2A0", star: true, d: 0.8 },
  { x: 22, y: 27, s: 6, c: "#BBD7F2", star: false, d: 2.4 },
  { x: 78, y: 24, s: 10, c: "#F0B8C4", star: true, d: 1 },
  { x: 10, y: 38, s: 7, c: "#C8DDB0", star: false, d: 0.3 },
  { x: 92, y: 36, s: 9, c: "#F3E2A0", star: true, d: 1.9 },
  { x: 6, y: 50, s: 12, c: "#BBD7F2", star: true, d: 2.7 },
  { x: 90, y: 52, s: 6, c: "#F0B8C4", star: false, d: 0.9 },
  { x: 14, y: 62, s: 7, c: "#F3E2A0", star: false, d: 1.4 },
  { x: 88, y: 66, s: 11, c: "#C8DDB0", star: true, d: 0.2 },
  { x: 5, y: 76, s: 9, c: "#F0B8C4", star: true, d: 2.2 },
  { x: 94, y: 80, s: 7, c: "#BBD7F2", star: false, d: 1.1 },
  { x: 12, y: 90, s: 6, c: "#C8DDB0", star: false, d: 0.5 },
  { x: 84, y: 93, s: 13, c: "#F3E2A0", star: true, d: 1.7 },
  { x: 40, y: 97, s: 7, c: "#F0B8C4", star: false, d: 2.9 },
  { x: 64, y: 96, s: 9, c: "#BBD7F2", star: true, d: 0.4 },
] as const;

function Sparkle({ x, y, s, c, star, d }: (typeof SPARKLES)[number]) {
  return (
    <span
      aria-hidden
      className="animate-twinkle absolute"
      style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, animationDelay: `${d}s` }}
    >
      {star ? (
        <svg viewBox="0 0 24 24" className="h-full w-full" fill={c}>
          <path d="M12 1.5l2.6 7.1 7.4.3-5.9 4.6 2.1 7.2L12 16.6l-6.2 4.1 2.1-7.2L2 8.9l7.4-.3z" />
        </svg>
      ) : (
        <span className="block h-full w-full rounded-full" style={{ background: c }} />
      )}
    </span>
  );
}

// Photobooth: strip foto "dicetak" keluar dari celah printer, lalu terus
// bergulir ke bawah tanpa henti (seperti rekaman contoh).
export default function PhotoboothSection() {
  const { groom, bride } = WEDDING_DATA;
  const ref = useRef<HTMLDivElement>(null);
  const playing = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section className="section bg-olive pb-10 pt-16 [container-type:inline-size]">
      {/* Bintang & titik pastel */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {SPARKLES.map((sp, i) => (
          <Sparkle key={i} {...sp} />
        ))}
      </div>

      {/* Judul */}
      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px 0px" }}
          transition={{ duration: 1, ease: OUT }}
          className="font-script text-[34px] leading-none text-ivory"
        >
          {groom.nickname} &amp; {bride.nickname}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px 0px" }}
          transition={{ duration: 1.1, ease: OUT, delay: 0.15 }}
          className="mt-1 font-rounded text-[min(12.5cqw,56px)] font-semibold leading-none tracking-[0.04em] text-ivory-light"
        >
          PHOTOBOOTH
        </motion.h2>
      </div>

      {/* Printer + strip. cqw di dalamnya relatif terhadap lebar printer. */}
      <div
        ref={ref}
        className="relative z-10 mx-auto mt-8 w-[80%] [container-type:inline-size]"
        style={{ aspectRatio: "885 / 306" }}
      >
        {/* Badan printer (lapisan belakang) */}
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px 0px" }}
          transition={{ duration: 1.2, ease: OUT, delay: 0.2 }}
          className="absolute inset-0 z-10"
        >
          <Image src="/images/photobooth/printer.png" alt="" aria-hidden width={885} height={306} className="h-auto w-full" />
        </motion.div>

        {/* Jendela keluar strip: mulai dari garis celah (46% tinggi printer) */}
        <div
          className="absolute left-[21%] z-20 w-[58%] overflow-hidden"
          style={{ top: "15.9cqw", height: `calc(${STRIP_H} * 1.3)`, ["--strip-h" as string]: STRIP_H }}
        >
          {/* Kolom strip diposisikan agar strip terbawah tepat di atas garis celah,
              lalu: (1) dua strip pertama keluar bertahap, (2) loop dua strip berikutnya
              terus-menerus (mulus karena pola pink-olive berulang) */}
          <div style={{ transform: `translateY(calc(${STRIP_H} * -${STRIPS.length}))` }}>
            <div
              className={playing ? "animate-strip-feed" : undefined}
              style={{ animationDuration: `${SECONDS_PER_STRIP * 2}s`, animationFillMode: "forwards" }}
            >
              <div
                className={playing ? "animate-strip-feed" : undefined}
                style={{
                  animationDuration: `${SECONDS_PER_STRIP * 2}s`,
                  animationDelay: `${SECONDS_PER_STRIP * 2}s`,
                  animationIterationCount: "infinite",
                }}
              >
                {STRIPS.map((color, i) => (
                  <div key={i} className="pb-[3cqw]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/images/photobooth/strip-${color}.jpg`}
                      alt={`Strip photobooth ${i + 1}`}
                      className="block w-full shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
                      style={{ aspectRatio: "652 / 1933" }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bibir atas printer di depan strip, agar strip tampak keluar dari dalam celah */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30">
          <Image src="/images/photobooth/printer-lip.png" alt="" aria-hidden width={885} height={137} className="h-auto w-full" />
        </div>

        {/* Ruang untuk strip yang bergulir di bawah printer */}
        <div aria-hidden style={{ height: `calc(${STRIP_H} * 1.3 + 15.9cqw)` }} />
      </div>
    </section>
  );
}
