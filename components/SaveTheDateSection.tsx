"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA, BACKGROUND_IMAGES } from "@/lib/constants";
import BackgroundCarousel from "@/components/ornaments/BackgroundCarousel";
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
    <section className="relative overflow-hidden bg-olive">
      <BackgroundCarousel images={BACKGROUND_IMAGES} dim={0.4} />
      <div className="relative z-10 w-full overflow-hidden [container-type:inline-size]" style={{ aspectRatio: "872 / 1150" }}>
        {/* Mesin tik + kertas (bagian tuts terpotong di bawah seperti desain) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT }}
          className="absolute left-[2.5%] -top-[1%] w-[95%]"
        >
          <Image src="/images/countdown/typewriter-transparent.png" alt="" aria-hidden width={1368} height={2064} className="h-auto w-full" />
        </motion.div>

        {/* Teks dipusatkan pada kertas (tepi kertas diukur dari aset: 18,2%-80,8% kanvas) */}
        <div className="absolute left-[18.2%] top-[17%] w-[62.6%] text-center font-typewriter" style={{ color: INK }}>
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

        {/* Sepasang anthurium, kiri (masuk dari kiri lalu bergoyang) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.5 }}
          className="pointer-events-none absolute left-[3.5%] top-[25.4%] w-[27.1%]"
        >
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
            className="origin-bottom"
          >
            <Image src="/images/countdown/anthurium-pair.png" alt="" aria-hidden width={369} height={842} className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Anthurium tunggal, kanan */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.8 }}
          className="pointer-events-none absolute left-[76%] top-[48.6%] w-[18.1%]"
        >
          <motion.div
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="origin-bottom"
          >
            <Image src="/images/countdown/anthurium-single.png" alt="" aria-hidden width={234} height={405} className="h-auto w-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
