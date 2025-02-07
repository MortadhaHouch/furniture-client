"use client"
import { BoxReveal } from "@/components/box-reveal";
import { SpotlightPreview } from "@/components/main/Spotlight";
import { TracingBeam } from "@/components/main/TracingBeam";
import { SparklesText } from "@/components/sparkles-text";
import { paragraphs } from "../../utils/contants";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Page() {
  const {theme} = useTheme();
  return (
    <main className="w-full min-h-screen flex flex-col justify-start items-center overflow-hidden">
      <SpotlightPreview>
        <div className="flex flex-col justify-center items-center gap-4 w-[90%] max-w-4xl text-center backdrop-blur-md p-6 rounded-lg bg-opacity-50 bg-white/10">
          <BoxReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Bienvenue chez <SparklesText text={"prestige déco"} />
            </h2>
          </BoxReveal>
          <BoxReveal>
            <p className={`text-sm md:text-base lg:text-lg ${theme == 'light'?'text-slate-700':'text-gray-300'}"`}>
              Découvrez des meubles qui racontent votre histoire. Que vous cherchiez un canapé douillet pour vos soirées cocooning ou une table élégante pour vos dîners entre amis, notre collection allie design, confort et qualité. Transformez votre intérieur en un espace unique, où chaque pièce reflète votre style.
            </p>
          </BoxReveal>
        </div>
      </SpotlightPreview>
      <TracingBeam className="w-full flex flex-col justify-center items-center gap-12 py-12">
        {paragraphs.map((item, idx) => (
          <div
            key={idx}
            className="w-full min-h-screen flex flex-col md:flex-row justify-center items-center gap-8 p-4"
          >
            <div className="w-full md:w-[40%] max-w-[450px] flex flex-col justify-center items-start gap-4">
              <BoxReveal>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  {item.title}
                </h3>
              </BoxReveal>
              <BoxReveal>
                <p className="text-sm md:text-base text-gray-300">
                  {item.description}
                </p>
              </BoxReveal>
            </div>
            <BoxReveal>
              <div className="md:w-[40%] max-w-[450px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={400}
                  height={400}
                  className="w-full h-full aspect-square object-cover hover:scale-110 hover:transition-all"
                />
              </div>
            </BoxReveal>
          </div>
        ))}
      </TracingBeam>
    </main>
  );
}