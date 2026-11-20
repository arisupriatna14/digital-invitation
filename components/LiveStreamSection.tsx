import { Play } from "lucide-react";
import { WEDDING_DATA } from "@/lib/constants";
import Photo from "@/components/ornaments/Photo";
import Flower from "@/components/ornaments/Flower";
import Pearls from "@/components/ornaments/Pearls";
import Reveal from "@/components/ornaments/Reveal";
import LaceEdge from "@/components/ornaments/LaceEdge";

export default function LiveStreamSection() {
  const { liveStream } = WEDDING_DATA;
  if (!liveStream.url) return null;

  return (
    <>
      <section className="section bg-moss pt-10 pb-24">
        <Reveal from="up" className="relative mx-auto max-w-[320px] bg-white z-10">
          <a href={liveStream.url} target="_blank" rel="noopener noreferrer" className="relative block aspect-square">
            <Photo src={liveStream.thumbnail} alt="Live streaming" className="w-full h-full" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-16 h-16 rounded-full bg-white/70 flex items-center justify-center">
                <Play size={28} className="text-olive fill-olive ml-1" />
              </span>
            </span>
          </a>
          <div className="text-center py-5">
            <h2 className="font-script text-[44px] leading-tight text-olive">Live Streaming</h2>
            <a href={liveStream.url} target="_blank" rel="noopener noreferrer" className="btn-olive mt-3">
              Buka Tautan
            </a>
          </div>
        </Reveal>
        <Flower name="primrose" width={80} className="absolute right-6 bottom-20 z-20" from="right" delay={0.4} />
        <div className="absolute left-[-10px] bottom-14">
          <Pearls width={130} loops={1} size={7} />
        </div>
      </section>
      <LaceEdge direction="up" className="bg-olive" />
    </>
  );
}
