"use client"
import React from "react";
import { Spotlight } from "../ui/spotlight";
import { useTheme } from "next-themes";

export function SpotlightPreview({children}:{children?:React.ReactNode}) {
  const {theme} = useTheme();
  return (
    <div className={`min-h-screen w-full rounded-md flex items-center justify-center ${theme == 'light'?'bg-white/[0.96]':'bg-black/[0.96]'} antialiased bg-grid-white/[0.02] relative overflow-hidden`}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      {children}
    </div>
  );
}
