"use client";

import { motion } from "framer-motion";
import { slideLeftVariants, slideRightVariants } from "@/lib/variants";
import { SPRING, WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import FlowerDivider from "@/components/ui/FlowerDivider";
interface PersonData {
  name: string;
  nickname: string;
  father: string;
  mother: string;
  photo: string;
  isGroom?: boolean;
}

function PersonCard({ data, slideVariant }: {
  data: PersonData;
  slideVariant: typeof slideLeftVariants;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={slideVariant}
      whileHover={{ y: -8, transition: SPRING.SNAPPY }}
      className="card-elegant flex flex-col items-center text-center cursor-default relative overflow-hidden"
    >
      {/* Tiny floral accent top */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 opacity-40">
        <svg width="40" height="16" viewBox="0 0 40 16">
          <path d="M8 8 Q12 2 20 8 Q28 2 32 8" stroke="#C9798A" strokeWidth="1" fill="none" opacity="0.6" />
          <circle cx="8" cy="8" r="2.5" fill="#C9798A" opacity="0.5" />
          <circle cx="20" cy="5" r="2" fill="#F0B8C4" opacity="0.6" />
          <circle cx="32" cy="8" r="2.5" fill="#C9798A" opacity="0.5" />
          <path d="M14 8 Q16 5 18 8" stroke="#87A878" strokeWidth="0.8" fill="none" />
          <path d="M22 8 Q24 5 26 8" stroke="#87A878" strokeWidth="0.8" fill="none" />
        </svg>
      </div>

      {/* Photo */}
      <div className="relative mt-6 mb-5">
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden ring-4 ring-blossom/25 shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-petal to-petal-dark flex items-center justify-center">
            <span className="font-display text-4xl italic text-blossom/60">
              {data.name.charAt(0)}
            </span>
          </div>
        </div>
        {/* Decorative ring */}
        <div className="absolute inset-0 rounded-full border-2 border-blossom/15 scale-110" />
      </div>

      <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-blossom/70 mb-2">
        {data.isGroom ? "Mempelai Pria" : "Mempelai Wanita"}
      </span>

      <h3 className="font-display text-xl md:text-2xl italic text-ink mb-1">
        {data.name}
      </h3>

      <FlowerDivider size="sm" className="my-2 scale-75" />

      <p className="font-sans text-xs text-ink/45 mb-1">
        {data.isGroom ? "Putra" : "Putri"} dari
      </p>
      <p className="font-serif text-sm italic text-ink/70">{data.father}</p>
      <p className="font-sans text-xs text-ink/35 my-0.5">&</p>
      <p className="font-serif text-sm italic text-ink/70">{data.mother}</p>
    </motion.div>
  );
}

export default function CoupleSection() {
  return (
    <section className="bg-gradient-to-b from-petal-dark/30 to-petal py-20 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-blossom/10 pointer-events-none" />

      <div className="section-container">
        <SectionHeader
          eyebrow="Mempelai"
          title="Dua Insan yang Dipersatukan"
          subtitle="Bersatu dalam ikatan suci yang diberkahi Allah SWT"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto">
          <PersonCard
            data={{ ...WEDDING_DATA.groom, isGroom: true }}
            slideVariant={slideLeftVariants}
          />
          <PersonCard
            data={{ ...WEDDING_DATA.bride, isGroom: false }}
            slideVariant={slideRightVariants}
          />
        </div>
      </div>
    </section>
  );
}
