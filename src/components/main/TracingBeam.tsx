"use client";
import React from "react";
import { TracingBeam as TracingBeamComponent } from "../ui/tracing-beam";
import clsx from "clsx";

export function TracingBeam({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <TracingBeamComponent className={clsx(className,"px-6")}>
      {children}
    </TracingBeamComponent>
  );
}