"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-60px 0px" } as const;

const MONTHS = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const DAYS_SHORT = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

function formatTime(d: Date) {
  return `${String(d.getHours()).padStart(2, "0")}.${String(d.getMinutes()).padStart(2, "0")}`;
}

// Save the date: bingkai renda berisi kalender mini, waktu akad & resepsi,
// dan lokasi. Posisi dalam persen terhadap kanvas desain 694 x 1100,
// teks memakai cqw agar ikut menskala.
export default function EventSection() {
  const { akad, resepsi } = WEDDING_DATA;
  const d = akad.date;
  // Hari-H diikuti 5 hari berikutnya
  const week = Array.from({ length: 6 }, (_, i) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + i));
  const addressLines = akad.address.split(", ");

  return (
    <section className="relative overflow-hidden bg-olive py-4">
      <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: "694 / 1100" }}>
        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT }}
          className="absolute inset-x-0 top-[5%] text-center font-script text-[10cqw] leading-none text-ivory-light"
        >
          Save The Date!
        </motion.h2>

        {/* Bingkai renda */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.2 }}
          className="absolute left-[3%] top-[14%] w-[94%] -rotate-[1.5deg]"
        >
          <Image src="/images/event/lace-rect.png" alt="" aria-hidden width={1135} height={1578} className="h-auto w-full" />
        </motion.div>

        {/* Ornamen: buket calla putih di sudut kanan atas bingkai */}
        <motion.div
          initial={{ opacity: 0, x: 40, y: -20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.7 }}
          className="pointer-events-none absolute left-[62%] top-[2%] z-20 w-[46%]"
        >
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="origin-bottom"
          >
            <Image src="/images/closing/calla-white-spray.png" alt="" aria-hidden width={687} height={1031} className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Ornamen: rangkaian bunga pink di sudut kiri bawah bingkai */}
        <motion.div
          initial={{ opacity: 0, x: -30, y: 30 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.9 }}
          className="pointer-events-none absolute left-[-5%] top-[81.5%] z-20 w-[58%]"
        >
          <motion.div
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="origin-bottom-left"
          >
            <Image src="/images/closing/pink-cluster.png" alt="" aria-hidden width={917} height={516} className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Isi bingkai */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT, delay: 0.6 }}
          className="absolute left-[16%] top-[26%] w-[68%] text-center"
        >
          {/* Kalender mini */}
          <p className="font-rounded text-[5.2cqw] font-semibold text-[#A4607A]">
            {MONTHS[d.getMonth()]} {d.getFullYear()}
          </p>
          <div className="mt-[3.5cqw] flex items-end justify-center gap-[2.8cqw] font-rounded font-semibold">
            {week.map((day, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className={`leading-none ${i === 0 ? "text-[4.4cqw] text-[#6F8A3A]" : "text-[3.5cqw] text-[#8FA75A]"}`}>
                  {i === 0 ? DAYS[day.getDay()] : DAYS_SHORT[day.getDay()]}
                </span>
                {i === 0 ? (
                  <span className="relative mt-[1.8cqw] flex h-[9cqw] w-[9.6cqw] items-center justify-center">
                    <svg viewBox="0 0 32 30" className="absolute inset-0 h-full w-full" aria-hidden>
                      {/* Hati dengan kurva bezier halus */}
                      <path
                        d="M16 28 C 9 22.5 1 16.5 1 9.5 C 1 5 4.4 1.8 8.6 1.8 C 11.6 1.8 14.2 3.4 16 6.2 C 17.8 3.4 20.4 1.8 23.4 1.8 C 27.6 1.8 31 5 31 9.5 C 31 16.5 23 22.5 16 28 Z"
                        fill="#A4607A"
                        stroke="#A4607A"
                        strokeWidth="0.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="relative -mt-[1cqw] text-[3.9cqw] leading-none text-white">{day.getDate()}</span>
                  </span>
                ) : (
                  <span className="mt-[3.2cqw] text-[3.9cqw] leading-none text-[#E8A0B0]">{day.getDate()}</span>
                )}
              </div>
            ))}
          </div>

          {/* Akad & Resepsi: dikelompokkan rapat lalu dipusatkan sebagai satu kesatuan */}
          <div className="mt-[12cqw] flex items-center justify-center gap-[4cqw]">
            <div>
              <p className="font-display text-[6.2cqw] italic leading-none text-[#2B2B23]">Akad</p>
              <p className="mt-[1.8cqw] font-sans text-[3.1cqw] text-[#2B2B23]">{formatTime(akad.date)}</p>
            </div>
            <Image src="/images/event/rings.png" alt="" aria-hidden width={165} height={126} className="h-auto w-[13cqw] shrink-0" />
            <div>
              <p className="font-display text-[6.2cqw] italic leading-none text-[#2B2B23]">Resepsi</p>
              <p className="mt-[1.8cqw] font-sans text-[3.1cqw] text-[#2B2B23]">
                {formatTime(resepsi.date)} - {resepsi.endTime}
              </p>
            </div>
          </div>

          {/* Lokasi */}
          <p className="mt-[10cqw] font-sans text-[2.9cqw] font-semibold text-[#2B2B23]">Lokasi :</p>
          <p className="mt-[2cqw] font-sans text-[2.8cqw] leading-[1.55] text-[#2B2B23]">
            {akad.venue}
            {addressLines.map((line) => (
              <span key={line}>
                <br />
                {line}
              </span>
            ))}
          </p>
          <a
            href={akad.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-[3cqw] inline-block font-sans text-[2.7cqw] text-[#2B2B23] underline underline-offset-4"
          >
            Lihat Peta
          </a>
        </motion.div>
      </div>
    </section>
  );
}
