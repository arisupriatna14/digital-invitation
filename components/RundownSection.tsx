import { WEDDING_DATA } from "@/lib/constants";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ornaments/Reveal";

function Clover({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`w-5 h-5 ${className}`} aria-hidden>
      <g fill="#353A20">
        <circle cx={7} cy={7} r={4.5} />
        <circle cx={13} cy={7} r={4.5} />
        <circle cx={7} cy={13} r={4.5} />
        <circle cx={13} cy={13} r={4.5} />
      </g>
    </svg>
  );
}

// Linimasa susunan acara: item bergantian kiri-kanan garis tengah.
export default function RundownSection() {
  const items = WEDDING_DATA.rundown;

  return (
    <section className="section bg-white">
      <SectionHeader title="Susunan Acara" className="mb-8" />

      <div className="text-center">
        <span className="inline-block bg-olive text-ivory-light font-serif text-base px-6 py-2.5 rounded-full">
          Resepsi
        </span>
      </div>

      <div className="relative mt-0 pb-2">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-olive" />
        <Clover className="absolute left-1/2 top-6 -translate-x-1/2" />
        <Clover className="absolute left-1/2 top-[55%] -translate-x-1/2" />

        {items.map((item, i) => {
          const left = i % 2 === 0;
          return (
            <Reveal
              key={item.time + item.title}
              from={left ? "left" : "right"}
              className={`w-1/2 py-3 ${left ? "pr-4 text-right" : "ml-auto pl-4 text-left"}`}
            >
              <p className="font-serif text-[17px] text-olive">{item.time}</p>
              <p className="font-serif text-[16px] text-olive/70 leading-snug mt-1.5">{item.title}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
