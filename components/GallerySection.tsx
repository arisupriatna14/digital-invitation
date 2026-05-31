"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { GALLERY_IMAGES, EASE, SPRING } from "@/lib/constants";
import { galleryGridVariants, galleryItemVariants } from "@/lib/variants";
import SectionHeader from "@/components/ui/SectionHeader";

export default function GallerySection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex((i) => (i !== null ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null));
  const nextPhoto = () => setLightboxIndex((i) => (i !== null ? (i + 1) % GALLERY_IMAGES.length : null));

  return (
    <section className="bg-petal-light/60 py-20 md:py-28">
      <div className="section-container">
        <SectionHeader
          eyebrow="Galeri"
          title="Momen Berharga"
          subtitle="Sepenggal kisah cinta yang kami abadikan"
        />

        {/* Masonry gallery */}
        <motion.div
          className="columns-2 md:columns-3 gap-3 md:gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={galleryGridVariants}
        >
          {GALLERY_IMAGES.map((img, index) => (
            <motion.div
              key={index}
              variants={galleryItemVariants}
              className="break-inside-avoid mb-3 md:mb-4 relative overflow-hidden rounded-xl cursor-pointer group [break-inside:avoid]"
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.02 }}
              transition={SPRING.SNAPPY}
            >
              <div className="relative w-full overflow-hidden rounded-xl">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-ink/60 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={SPRING.BOUNCY}
                    className="w-10 h-10 bg-cream-light/90 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Maximize2 size={16} className="text-blossom" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE.IN_OUT_SINE }}
            className="fixed inset-0 bg-ink/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Prev button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={lightboxIndex}
                src={GALLERY_IMAGES[lightboxIndex].src}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: EASE.OUT_EXPO }}
                className="max-w-[80vw] max-h-[80vh] object-contain rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </AnimatePresence>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 w-10 h-10 bg-cream-light/10 hover:bg-cream-light/20 rounded-full flex items-center justify-center text-cream-light transition-colors z-10"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              <div className="flex gap-1.5">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === lightboxIndex ? "bg-cream-light w-4" : "bg-cream-light/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
