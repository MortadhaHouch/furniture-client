"use client"
import React from "react";
import { Spotlight } from "../ui/spotlight";
import { useTheme } from "next-themes";

export function SpotlightPreview({children}:{children?:React.ReactNode}) {
  const {theme} = useTheme();
  return (
    <div className={`min-h-screen w-full rounded-md flex flex-col items-center justify-center  antialiased bg-grid-white/[0.02] relative overflow-hidden`}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={theme == 'light'?'rgba(0, 0, 0, 0.75)':'rgba(224, 224, 224, 0.75)'}
      />
      {children}
    </div>
  );
}
