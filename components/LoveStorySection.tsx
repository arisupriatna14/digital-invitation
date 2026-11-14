import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Polaroid from "@/components/ornaments/Polaroid";
import Flower from "@/components/ornaments/Flower";
import Pearls from "@/components/ornaments/Pearls";
import Reveal from "@/components/ornaments/Reveal";

export default function LoveStorySection() {
  return (
    <section className="section bg-olive">
      <SectionHeader title="Kisah Cinta Kami" tone="dark" />

      <div className="space-y-20">
        {WEDDING_DATA.loveStory.map((chapter, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={chapter.title} className="relative">
              {/* Kartu kertas sobek */}
              <Reveal
                from="up"
                className="relative mx-2 bg-gradient-to-b from-ivory-light to-ivory torn-bottom px-6 pt-6 pb-24 text-center shadow-lg"
              >
                <h3 className="font-serif text-lg text-olive">{chapter.title}</h3>
                <p className="font-serif text-[16px] leading-snug text-olive/70 mt-2">{chapter.text}</p>
              </Reveal>

              {/* Polaroid menumpuk di bawah kartu */}
              <div className={`relative -mt-14 flex ${flip ? "justify-start pl-4" : "justify-end pr-2"}`}>
                <Polaroid src={chapter.photo} alt={chapter.title} rotate={flip ? -7 : 9} stacked className="w-[64%]" delay={0.2} />
              </div>

              <Flower
                name={flip ? "primrose" : "peony"}
                width={96}
                className={`absolute z-20 ${flip ? "-right-4 top-[38%]" : "-left-6 top-[34%]"}`}
                from={flip ? "right" : "left"}
                delay={0.4}
              />
              <div className={`absolute z-20 ${flip ? "right-[-24px] bottom-10" : "left-[-24px] top-[46%]"}`}>
                <Pearls width={170} loops={2} size={8} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
