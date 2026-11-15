"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Polaroid from "@/components/ornaments/Polaroid";
import Reveal from "@/components/ornaments/Reveal";

const OUT = [0.19, 1, 0.22, 1] as const;
const VIEW = { once: true, margin: "-40px 0px" } as const;

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
  label: string;
  name: string;
  parentLine: string;
  father: string;
  mother: string;
  instagram: string;
  align: "left" | "right";
}

function Person({ label, name, parentLine, father, mother, instagram, align }: PersonProps) {
  const right = align === "right";
  // "Nama, Gelar" -> nama dalam font script, gelar sebagai baris kecil di bawahnya
  const [baseName, ...degrees] = name.split(", ");
  const degree = degrees.join(", ");
  return (
    <Reveal from={right ? "right" : "left"} className={right ? "text-right" : "text-left"}>
      <p className="font-serif italic text-[17px] text-olive">{label}</p>
      <h3 className="font-script text-[44px] leading-tight text-olive mt-1">{baseName}</h3>
      {degree && <p className="font-serif text-[16px] tracking-wide text-olive/80 -mt-1">{degree}</p>}
      <p className="font-serif italic text-[16px] text-olive/90 mt-3 leading-snug">
        {parentLine} {father}
        <br />&amp; {mother}
      </p>
      {instagram && (
        <a
          href={`https://instagram.com/${instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 font-serif text-[15px] text-olive border-b border-olive/60"
        >
          <InstagramIcon /> @{instagram}
        </a>
      )}
    </Reveal>
  );
}

export default function CoupleSection() {
  const { groom, bride, photos } = WEDDING_DATA;

  return (
    <section className="section bg-paper !pt-10">
      <SectionHeader
        className="mb-14"
        title="Mempelai"
        subtitle="Setiap kisah cinta itu unik, dan kisah kami membawa kami pada hari yang tak terlupakan ini. Dengan penuh sukacita, kami mengundang Anda merayakan persatuan kami."
      />

      {/* Dua polaroid bertumpuk dengan rangkaian bunga.
          Posisi dalam persen terhadap kanvas 690 x 700. */}
      <div className="relative -mx-6 [container-type:inline-size]" style={{ aspectRatio: "690 / 700" }}>
        <Polaroid src={photos.couple[1]} alt={bride.name} rotate={6} className="absolute right-[6%] top-[1%] w-[46%] z-[5]" delay={0.3} />
        <Polaroid src={photos.couple[0]} alt={groom.name} rotate={-4} className="absolute left-[6%] top-[13%] w-[48%] z-10" delay={0.1} />

        {/* Sepasang anthurium pink (cermin) menyilang di belakang kedua polaroid:
            tangkainya masuk ke balik frame di perbatasan atas tengah */}
        {[false, true].map((flip) => (
          <motion.div
            key={String(flip)}
            initial={{ opacity: 0, y: -24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEW}
            transition={{ duration: 1.6, ease: OUT, delay: flip ? 0.8 : 0.6 }}
            className={`pointer-events-none absolute z-[8] ${flip ? "left-[36%] top-[-7%] w-[18%]" : "left-[40%] top-[-10%] w-[21%]"}`}
          >
            <motion.div
              animate={{ rotate: flip ? [36, 40, 36] : [-36, -40, -36] }}
              transition={{ duration: flip ? 6.8 : 6, repeat: Infinity, ease: "easeInOut", delay: flip ? 0.9 : 0 }}
              className="origin-bottom"
            >
              <Image src="/images/couple/anthurium-pink.png" alt="" aria-hidden width={449} height={561} className={`h-auto w-full ${flip ? "-scale-x-100" : ""}`} />
            </motion.div>
          </motion.div>
        ))}

        {/* Buket campur calla, anthurium & orkid di bawah tengah, amaranthus menjuntai */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEW}
          transition={{ duration: 1.8, ease: OUT, delay: 0.8 }}
          className="pointer-events-none absolute left-[34%] top-[49%] z-20 w-[27%]"
        >
          <motion.div animate={{ rotate: [-1.5, 1.5, -1.5] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="origin-top">
            <Image src="/images/couple/bouquet-mixed.png" alt="" aria-hidden width={450} height={842} className="h-auto w-full" />
          </motion.div>
        </motion.div>

      </div>

      <div className="relative mt-10 space-y-4">
        <Person
          label="Mempelai Pria"
          name={groom.name}
          parentLine="Putra dari"
          father={groom.father}
          mother={groom.mother}
          instagram={groom.instagram}
          align="left"
        />
        <Reveal from="zoom" className="text-center font-display text-[110px] leading-none text-olive/15 select-none" >
          &amp;
        </Reveal>
        <Person
          label="Mempelai Wanita"
          name={bride.name}
          parentLine="Putri dari"
          father={bride.father}
          mother={bride.mother}
          instagram={bride.instagram}
          align="right"
        />
      </div>
    </section>
  );
}
