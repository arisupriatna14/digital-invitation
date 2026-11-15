"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

// Kisah cinta versi kolase: latar foto blur olive, dua bab pertama sebagai
// paragraf di atas kolase perangko linen, bab terakhir di bawahnya.
export default function LoveStoryCollageSection() {
  const chapters = WEDDING_DATA.loveStory;
  const above = chapters.slice(0, -1);
  const last = chapters[chapters.length - 1];

  return (
    <section className="relative overflow-hidden px-6 pt-16 pb-16 text-ivory-light">
      {/* Latar foto blur olive */}
      <Image
        src="/images/lovestory/bg.jpg"
        alt=""
        aria-hidden
        fill
        quality={90}
        sizes="(max-width: 480px) 100vw, 480px"
        className="object-cover"
      />
      {/* Gradasi ke olive di tepi bawah agar menyatu dengan section berikutnya
          (bagian bawah foto latarnya terang) */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-olive" />

      <div className="relative z-10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.2, ease: OUT }}
          className="script-title text-center text-ivory-light"
        >
          Kisah Cinta Kami
        </motion.h2>

        {/* Dua bab pertama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1, ease: OUT, delay: 0.2 }}
          className="mx-auto mt-10 max-w-[380px] text-center font-sans text-[14px] leading-[1.55]"
        >
          {above.map((c) => (
            <p key={c.title}>
              {c.title} &mdash; {c.text}
            </p>
          ))}
        </motion.div>

        {/* Kolase perangko linen */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.94, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.5, ease: OUT, delay: 0.3 }}
          className="relative mx-auto mt-8 w-full max-w-[400px]"
        >
          <Image
            src="/images/lovestory/collage.png"
            alt="Kolase foto kisah cinta kami"
            width={900}
            height={905}
            sizes="(max-width: 480px) 100vw, 400px"
            className="h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]"
          />
        </motion.div>

        {/* Bab terakhir */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1, ease: OUT, delay: 0.2 }}
          className="mx-auto mt-10 max-w-[360px] text-center font-sans"
        >
          <p className="text-[16px]">{last.title}</p>
          <p className="mt-5 text-[14px] leading-[1.55]">{last.text}</p>
        </motion.div>
      </div>
    </section>
  );
}
