"use client";
import React from "react";
import { HeroParallax as HeroParallaxComponent } from "../ui/hero-parallax";
import { paragraphs } from "../../../utils/constants";

export function HeroParallax() {
  return <HeroParallaxComponent paragraphs={paragraphs} />;
}