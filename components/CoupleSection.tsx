"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

// Posisi dalam persen terhadap kanvas desain 758 x 1314, teks memakai cqw.
// Semua elemen diukur dari gambar desain.

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

interface PersonProps {
  name: string;
  parentLine: string;
  father: string;
  mother: string;
  instagram: string;
  className: string;
  delay: number;
}

function Person({ name, parentLine, father, mother, instagram, className, delay }: PersonProps) {
  // "Nama, Gelar" -> hanya nama yang ditampilkan (gelar tidak ditampilkan)
  const [baseName] = name.split(", ");
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1.3, ease: OUT, delay }}
      className={`absolute text-center text-olive ${className}`}
    >
      <h3 className="font-script text-[7.4cqw] leading-none">{baseName}</h3>
      <p className="mt-[2.6cqw] font-sans text-[2.3cqw] leading-[1.5]">
        {parentLine} {father}
        <br />&amp; {mother}
      </p>
      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-[2cqw] inline-flex items-center gap-1.5 border-b border-olive/60 font-sans text-[2.1cqw]"
        >
          <InstagramIcon /> @{instagram}
        </a>
      )}
    </motion.div>
  );
}

export default function CoupleSection() {
  const { groom, bride } = WEDDING_DATA;

  return (
    <section className="relative overflow-hidden bg-paper">
      <div className="relative w-full [container-type:inline-size]" style={{ aspectRatio: "758 / 1314" }}>
        {/* Lampu gantung: turun dari atas lalu berayun sangat pelan */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT }}
          className="pointer-events-none absolute left-[10%] top-[-1%] z-10 w-[22%]"
        >
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="origin-top"
          >
            <Image src="/images/couple/chandelier.png" alt="" aria-hidden width={308} height={317} className="h-auto w-full" priority={false} />
          </motion.div>
        </motion.div>

        {/* Judul */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.3, ease: OUT, delay: 0.1 }}
          className="absolute right-[17%] top-[3.5%] font-script text-[11cqw] leading-none text-olive"
        >
          Mempelai
        </motion.h2>

        {/* Pengantar, rata kanan */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.2, ease: OUT, delay: 0.3 }}
          className="absolute right-[7%] top-[13%] w-[62%] text-right font-sans text-[2.3cqw] leading-[1.5] text-olive"
        >
          Setiap kisah cinta itu unik, dan kisah kami membawa kami pada hari yang tak terlupakan ini.
          Dengan penuh sukacita, kami mengundang anda untuk merayakan persatuan kami.
        </motion.p>

        {/* Potret mempelai pria (bingkai renda) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={VIEW}
          transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1, delay: 0.3 }}
          className="absolute left-[6.6%] top-[22.5%] z-10 w-[43.5%]"
        >
          <Image src="/images/couple/portrait-groom.png" alt={groom.name} width={800} height={793} className="h-auto w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]" />
        </motion.div>

        <Person
          name={groom.name}
          parentLine="Putra dari"
          father={groom.father}
          mother={groom.mother}
          instagram={groom.instagram}
          className="left-[52%] top-[29%] w-[44%]"
          delay={0.5}
        />

        {/* Lukisan di dinding (terpotong tepi kanan seperti desain) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT, delay: 0.4 }}
          className="pointer-events-none absolute left-[84.5%] top-[43.8%] w-[24%]"
        >
          <Image src="/images/couple/painting.png" alt="" aria-hidden width={339} height={235} className="h-auto w-full" />
        </motion.div>

        {/* Ranting daun, kiri */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.5 }}
          className="pointer-events-none absolute left-[-12%] top-[40.5%] w-[44%]"
        >
          <motion.div
            animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -3, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="origin-left"
          >
            <Image src="/images/couple/leaf.png" alt="" aria-hidden width={712} height={658} className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Ampersand */}
        <motion.p
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT, delay: 0.6 }}
          className="pointer-events-none absolute left-[40%] top-[45.5%] select-none font-display text-[22cqw] leading-none text-olive/15"
        >
          &amp;
        </motion.p>

        {/* Potret mempelai wanita (bingkai renda) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={VIEW}
          transition={{ type: "spring", stiffness: 60, damping: 16, mass: 1, delay: 0.3 }}
          className="absolute left-[50%] top-[58.2%] z-10 w-[44%]"
        >
          <Image src="/images/couple/portrait-bride.png" alt={bride.name} width={800} height={794} className="h-auto w-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]" />
        </motion.div>

        <Person
          name={bride.name}
          parentLine="Putri dari"
          father={bride.father}
          mother={bride.mother}
          instagram={bride.instagram}
          className="left-[3%] top-[65%] w-[46%]"
          delay={0.5}
        />

        {/* Lily pink menimpa bingkai mempelai wanita */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.8 }}
          className="pointer-events-none absolute left-[73%] top-[68.5%] z-20 w-[31%]"
        >
          <motion.div
            animate={{ rotate: [1.5, -1.5, 1.5] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="origin-bottom-right"
          >
            <Image src="/images/couple/lily.png" alt="" aria-hidden width={511} height={586} className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Lampu meja */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.4, ease: OUT, delay: 0.6 }}
          className="pointer-events-none absolute left-[9.5%] top-[79.3%] z-10 w-[19%]"
        >
          <Image src="/images/couple/lamp.png" alt="" aria-hidden width={221} height={239} className="h-auto w-full" />
        </motion.div>

        {/* Lantai motif catur */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEW}
          transition={{ duration: 1.6, ease: OUT, delay: 0.2 }}
          className="pointer-events-none absolute inset-x-0 bottom-[-2px]"
        >
          <Image src="/images/couple/floor.png" alt="" aria-hidden width={1366} height={254} className="h-auto w-full" sizes="(max-width: 480px) 100vw, 480px" />
        </motion.div>
      </div>
    </section>
  );
}
