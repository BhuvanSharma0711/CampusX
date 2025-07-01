"use client";
import React from "react";
import { ColourfulText } from "./ui/colourful-text";

interface ColourfulTextDemoProps {
  mainText: string;
  colourfulWord: string;
}

export function ColourfulTextDemo({ mainText, colourfulWord }: ColourfulTextDemoProps) {
  return (
    <div>
      <h1 className="text-2xl md:text-5xl lg:text-5xl font-bold text-white relative z-2 font-sans">
        {mainText} <ColourfulText text={colourfulWord} />
      </h1>
    </div>
  );
}
