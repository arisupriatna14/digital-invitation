"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants, fadeUpVariants, fadeInVariants } from "@/lib/variants";
import FlowerDivider from "@/components/ui/FlowerDivider";

export default function OpeningSection() {
  return (
    <section className="bg-gradient-to-b from-petal via-petal-light/60 to-petal py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background circles */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-blossom/20" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-sage/20" />
      </div>

      <motion.div
        className="section-container relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainerVariants}
      >
        <FlowerDivider size="lg" />

        {/* Bismillah */}
        <motion.div variants={fadeUpVariants} className="text-center mb-8 mt-4">
          <p className="arabic text-2xl md:text-3xl text-ink/80 leading-loose">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </motion.div>

        {/* Quran verse card */}
        <motion.div
          variants={fadeInVariants}
          className="max-w-2xl mx-auto text-center bg-cream/80 rounded-3xl p-6 md:p-10 border border-blossom/15 shadow-sm mb-6"
        >
          <p className="arabic text-lg md:text-xl text-ink/85 leading-loose mb-5">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
            وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
          </p>

          <FlowerDivider size="sm" className="my-4" />

          <p className="font-serif text-sm md:text-base italic text-ink/65 leading-relaxed">
            &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri
            dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya
            di antaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
            tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-blossom/80 mt-3">
            Q.S. Ar-Rum: 21
          </p>
        </motion.div>

        <FlowerDivider size="sm" />

        <motion.div variants={fadeUpVariants} className="text-center max-w-xl mx-auto mt-6">
          <p className="font-sans text-[10px] uppercase tracking-[0.35em] text-blossom/80 mb-4">
            Dengan Memohon Ridha Allah SWT
          </p>
          <p className="font-serif text-base md:text-lg text-ink/70 leading-relaxed italic">
            Kami mengundang Bapak / Ibu / Saudara / Saudari untuk hadir dan memberikan
            doa restu dalam acara pernikahan kami
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
