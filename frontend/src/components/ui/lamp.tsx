"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const targetWidth = isMdUp ? "30rem" : "15rem";

  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-center overflow-hidden bg-slate-950 w-full rounded-md z-0 h-[100px] md:h-[250px]",
        className
      )}
    >
      {/* Lamp visual */}
      <div className="absolute flex w-full items-start justify-center isolate z-0 pt-10 md:pt-20">
        {/* Main conic lamp beam */}
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          animate={{ opacity: 1, width: targetWidth }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(from 180deg at center top, cyan, transparent 70%)`,
          }}
          className="absolute top-0 h-56 bg-gradient-conic text-white"
        >
        <div className="absolute  w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        <div className="absolute  w-40 h-[100%] left-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        
        </motion.div>

        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
        <div className="absolute  w-40 h-[100%] right-0 bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
        <div className="absolute  w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl"></div>

         <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl"
        ></motion.div>


        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: targetWidth }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="absolute top-0 z-50 h-0.5 bg-cyan-400"
        />

        <div className="absolute top-0 z-40 h-44 w-full bg-slate-950" />
      </div>

      {/* Text content */}
      <div className="relative z-25 flex flex-col items-center justify-center px-5 md:mt-10 text-center h-full w-full">
        {children}
      </div>
    </div>
  );
};
