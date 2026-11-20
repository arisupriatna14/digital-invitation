"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-60px 0px" } as const;

// Ayat Al-Qur'an dalam bingkai renda oval. Semua posisi dalam persen
// terhadap kanvas desain 876 x 1032, teks memakai cqw agar ikut menskala.
export default function OpeningSection() {
  const { quote } = WEDDING_DATA;

  return (
    <section className="relative flex min-h-[100svh] flex-col bg-moss px-0 overflow-hidden">

      {/* Kanvas diperbesar 120% (sisi kiri-kanan desain yang kosong dipotong)
          agar bingkai & bunga tampil lebih besar; teks ikut menskala. */}
      {/* Bingkai di tengah ruang di atas lantai (section setinggi satu layar) */}
      <div className="flex flex-1 items-center">
      <div
        className="relative -ml-[10%] w-[120%] shrink-0 [container-type:inline-size]"
        style={{ aspectRatio: "876 / 1032" }}
      >
        {/* Bingkai renda oval */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT }}
          className="absolute left-[12.5%] top-[6.5%] w-[75%]"
        >
          <Image src="/images/quran/lace-oval.png" alt="" aria-hidden width={1043} height={1365} className="h-auto w-full" />
        </motion.div>

        {/* Isi ayat, dipusatkan vertikal di dalam bingkai oval */}
        <div className="absolute left-[29%] top-[15%] flex h-[66%] w-[42%] items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT, delay: 0.5 }}
          className="w-full text-center text-[#2B2B23]"
        >
          <h2 className="font-caps text-[3.2cqw] font-bold tracking-wide">{quote.title}</h2>

          <span className="mx-auto mt-[3cqw] block h-px w-[14cqw] bg-[#2B2B23]/70" />

          <p className="mt-[3cqw] font-sans text-[2.4cqw] leading-[1.6]">&ldquo;{quote.text}&rdquo;</p>
        </motion.div>
        </div>

        {/* Bunga lili, kiri atas (masuk dari kiri) */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -10 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.8 }}
          className="pointer-events-none absolute left-[11%] top-[10.5%] w-[23%]"
        >
          <Image src="/images/quran/lily.png" alt="" aria-hidden width={342} height={341} className="h-auto w-full" />
        </motion.div>

        {/* Bunga calla & pita renda, kanan bawah (masuk dari kanan) */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 1 }}
          className="pointer-events-none absolute left-[65.5%] top-[56%] w-[26.5%]"
        >
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="origin-bottom"
          >
            <Image src="/images/quran/calla-bow.png" alt="" aria-hidden width={394} height={569} className="h-auto w-full" />
          </motion.div>
        </motion.div>
      </div>
      </div>

      {/* Lantai motif catur di tepi bawah (turun 2px agar tidak ada celah) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEW}
        transition={{ duration: 1.4, ease: OUT, delay: 0.2 }}
        className="pointer-events-none relative -mb-[2px]"
      >
        <Image src="/images/quran/floor-bottom.png" alt="" aria-hidden width={1366} height={238} className="block h-auto w-full" sizes="(max-width: 480px) 100vw, 480px" />
      </motion.div>
    </section>
  );
}
