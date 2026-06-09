"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/variants";
import FlowerDivider from "./FlowerDivider";
import BouquetCluster from "./BouquetCluster";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <motion.div
      className={`text-center mb-12 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={staggerContainerVariants}
    >
      <motion.div variants={fadeUpVariants} className="flex justify-center mb-5">
        <BouquetCluster width={240} />
      </motion.div>
      {eyebrow && (
        <motion.p variants={fadeUpVariants} className="font-sans text-xs uppercase tracking-[0.35em] text-blossom/80 mb-2">
          {eyebrow}
        </motion.p>
      )}
      <motion.h2 variants={fadeUpVariants} className="font-display text-3xl md:text-4xl text-ink italic leading-tight">
        {title}
      </motion.h2>
      <motion.div variants={fadeUpVariants}>
        <FlowerDivider size="sm" className="my-3" />
      </motion.div>
      {subtitle && (
        <motion.p variants={fadeUpVariants} className="font-serif text-base text-ink/55 italic">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
