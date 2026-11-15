"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import CountdownTimer from "@/components/ui/CountdownTimer";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-60px 0px" } as const;
const INK = "#3A3A32";

function toCalendarStamp(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

// Judul muncul huruf per huruf seperti diketik
function Typed({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: 0.05, delay: delay + i * 0.07 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

// Hitung mundur di atas kertas mesin tik. Posisi dalam persen terhadap
// kanvas desain 872 x 1150; teks memakai cqw agar ikut menskala.
export default function SaveTheDateSection() {
  const { akad, resepsi, groom, bride } = WEDDING_DATA;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Pernikahan ${groom.nickname} & ${bride.nickname}`
  )}&dates=${toCalendarStamp(akad.date)}/${toCalendarStamp(resepsi.date)}&location=${encodeURIComponent(akad.address)}`;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="relative z-10 w-full overflow-hidden [container-type:inline-size]" style={{ aspectRatio: "872 / 1128" }}>
        {/* Mesin tik + kertas (bagian tuts terpotong di bawah seperti desain) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT }}
          className="absolute left-[2.5%] -top-[1%] z-10 w-[95%]"
        >
          <Image src="/images/countdown/typewriter-v2.png" alt="" aria-hidden width={1366} height={1894} className="h-auto w-full" />
        </motion.div>

        {/* Teks dipusatkan pada kertas (tepi kertas diukur dari aset: 18,2%-80,8% kanvas) */}
        <div className="absolute left-[18.2%] top-[17%] z-20 w-[62.6%] text-center font-typewriter" style={{ color: INK }}>
          <p className="text-[3.2cqw] tracking-[0.2em] uppercase">
            <Typed text="Save the date" delay={0.6} />
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-[2cqw] text-[2.6cqw]"
          >
            {formatDate(akad.date)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 1, ease: OUT, delay: 2.2 }}
            className="mt-[10cqw]"
          >
            <CountdownTimer
              targetDate={akad.date}
              layout="row"
              className="text-[6.2cqw]"
              numberClassName="font-typewriter"
              labelClassName="font-typewriter text-[2.1cqw] tracking-[0.12em] uppercase"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="mt-[9cqw] text-[2.3cqw]"
          >
            menuju hari bahagia kami ....
          </motion.p>
          <motion.a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={VIEW}
            transition={{ duration: 0.8, delay: 3.1 }}
            className="mt-[3cqw] inline-block border-b text-[2.5cqw] tracking-[0.08em]"
            style={{ borderColor: INK }}
          >
            &rarr; Simpan ke Kalender
          </motion.a>
        </div>

        {/* Anthurium: kepala bunga di depan kertas, tangkai di belakang mesin tik */}
        {/* Sepasang anthurium kiri dipisah jadi dua gambar (kanvas sama 369 x 842)
            agar bunga tinggi dan bunga tengah bisa digeser terpisah */}
        <Anthurium
          src="/images/countdown/anthurium-tall.png"
          w={369}
          h={842}
          headPct={36}
          className="left-[1.5%] top-[25.4%] w-[27.1%]"
          fromX={-40}
          delay={0.5}
          sway={[-1.5, 1.5, -1.5]}
          swayDuration={6}
          swayDelay={2.5}
        />
        <Anthurium
          src="/images/countdown/anthurium-mid.png"
          w={369}
          h={842}
          headPct={76}
          className="left-[-2.5%] top-[25.4%] w-[27.1%]"
          fromX={-40}
          delay={0.65}
          sway={[1, -1, 1]}
          swayDuration={6.8}
          swayDelay={2.8}
        />
        <Anthurium
          src="/images/countdown/anthurium-single.png"
          w={234}
          h={405}
          headPct={61}
          className="left-[76%] top-[48.6%] w-[18.1%]"
          fromX={40}
          delay={0.8}
          sway={[1.5, -1.5, 1.5]}
          swayDuration={5}
          swayDelay={3}
        />
      </div>
    </section>
  );
}

interface AnthuriumProps {
  src: string;
  w: number;
  h: number;
  /** Persen tinggi gambar yang berisi kepala bunga (bagian ini ditampilkan di depan) */
  headPct: number;
  className: string;
  fromX: number;
  delay: number;
  sway: number[];
  swayDuration: number;
  swayDelay: number;
}

// Dirender dua lapis dengan animasi identik: lapisan belakang utuh (tangkainya
// tertutup mesin tik), lapisan depan dipotong hanya sampai kepala bunga.
function Anthurium({ src, w, h, headPct, className, fromX, delay, sway, swayDuration, swayDelay }: AnthuriumProps) {
  return (
    <>
      {[false, true].map((front) => (
        <motion.div
          key={String(front)}
          initial={{ opacity: 0, x: fromX }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay }}
          className={`pointer-events-none absolute ${front ? "z-30" : "z-0"} ${className}`}
          style={front ? { clipPath: `inset(0 0 ${100 - headPct}% 0)` } : undefined}
        >
          <motion.div
            animate={{ rotate: sway }}
            transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut", delay: swayDelay }}
            className="origin-bottom"
          >
            <Image src={src} alt="" aria-hidden width={w} height={h} className="h-auto w-full" />
          </motion.div>
        </motion.div>
      ))}
    </>
  );
}
