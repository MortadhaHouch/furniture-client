"use client"
import { BoxReveal } from "@/components/ui/box-reveal";
import { SpotlightPreview } from "@/components/main/Spotlight";
import { TracingBeam } from "@/components/main/TracingBeam";
import { SparklesText } from "@/components/ui/sparkles-text";
import { imageLinks, paragraphs } from "../../utils/constants";
import Image from "next/image";
import { useTheme } from "next-themes";
import { BsArrowsFullscreen } from "react-icons/bs";
import { HoverImageLinks } from "@/components/main/HoverImageLinks";
import { useState } from "react";
import AlertDialog from "@/components/main/AlertDialog";
import { Scene } from "@/components/main/Image3D";
import { GridPattern } from "@/components/main/GridPattern";
import { HeroParallax } from "@/components/main/HeroParallax";
export default function Page() {
  const {theme} = useTheme();
  const [isShown,setIsShown] = useState(false);
  return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden">
      <GridPattern>
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
      </GridPattern>
      <HeroParallax/>
      <TracingBeam className="w-full flex flex-col justify-center items-center">
        {paragraphs.map((item, idx) => (
          <div
            key={idx}
            className="w-[80%] max-w-7xl min-h-screen flex flex-row justify-between items-center flex-wrap gap-8 p-4"
          >
            <div className="w-full md:w-[40%] max-w-[450px] flex flex-col justify-center items-center gap-4">
              <BoxReveal>
                <h3 className={"text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-600"}>
                  {item.title}
                </h3>
              </BoxReveal>
              <BoxReveal>
                <p className={"text-sm md:text-1xl font-bold text-slate-600 dark:text-slate-300"}>
                  {item.description}
                </p>
              </BoxReveal>
            </div>
            <BoxReveal className="flex justify-center items-center">
              <div className="w-[300px] h-[300px] relative flex justify-center items-center">
                <Image
                  src={item.img}
                  alt={item.title}
                  width={300}
                  height={300}
                  className="w-full h-full aspect-square object-cover transition-transform duration-300 hover:scale-110"
                />
                <AlertDialog action="fermer" actionHandler={()=>{}} containerClassName="w-[80%] h-[80%]" className="absolute top-1 right-1" trigger={<span onClick={()=>setIsShown(true)} className="bg-transparent flex justify-center items-center backdrop-blur-md"><BsArrowsFullscreen/></span>} title="">
                  <Scene imagesPath={imageLinks[idx]}/>
                </AlertDialog>
              </div>
            </BoxReveal>
          </div>
        ))}
      </TracingBeam>
      <HoverImageLinks/>
    </main>
  );
}