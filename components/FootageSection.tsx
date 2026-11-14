import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Flower from "@/components/ornaments/Flower";
import Pearls from "@/components/ornaments/Pearls";
import Photo from "@/components/ornaments/Photo";
import Reveal from "@/components/ornaments/Reveal";

// Video prewedding (YouTube) dan filter Instagram; masing-masing
// disembunyikan bila datanya kosong.
export default function FootageSection() {
  const { preweddingVideoId, instagramFilterUrl, photos, groom, bride, akad } = WEDDING_DATA;
  if (!preweddingVideoId && !instagramFilterUrl) return null;

  return (
    <section className="section bg-white">
      {preweddingVideoId && (
        <div className="relative">
          <SectionHeader title="Video Prewedding" />
          <Reveal from="up" className="relative z-10 mx-1 shadow-xl">
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${preweddingVideoId}`}
                title="Video prewedding"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="bg-olive py-3 text-center">
              <p className="font-script text-[38px] leading-tight text-ivory-light">The Pre Wedding</p>
            </div>
          </Reveal>
          <Flower name="primrose" width={70} className="absolute -left-6 bottom-0 z-20" from="left" delay={0.3} />
          <div className="absolute -right-8 -bottom-8 z-20">
            <Pearls width={150} loops={1} size={7} />
          </div>
        </div>
      )}

      {instagramFilterUrl && (
        <div className={preweddingVideoId ? "mt-24" : ""}>
          <SectionHeader
            title="Filter Pernikahan"
            subtitle="Abadikan momen Anda saat menghadiri pernikahan kami dengan filter Instagram berikut."
          />
          <Reveal from="up" className="relative mx-auto max-w-[280px] rounded-b-[36px] overflow-hidden shadow-xl">
            <div className="relative aspect-[9/12]">
              <Photo src={photos.hero} alt="Filter Instagram" className="w-full h-full" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ivory to-transparent pt-16 pb-4 text-center text-olive">
                <p className="font-display text-3xl leading-tight">
                  {groom.nickname} &amp; {bride.nickname}
                </p>
                <p className="font-serif text-sm tracking-[0.3em] mt-1">
                  {akad.date.getDate()} . {akad.date.getMonth() + 1} . {akad.date.getFullYear()}
                </p>
              </div>
            </div>
            <a
              href={instagramFilterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-olive py-4 text-center font-serif text-base text-ivory-light"
            >
              Gunakan Filter
            </a>
          </Reveal>
        </div>
      )}
    </section>
  );
}
