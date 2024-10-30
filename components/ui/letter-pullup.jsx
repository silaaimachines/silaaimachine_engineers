"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function LetterPullup({
  className,
  words,
  delay
}) {
  const letters = words.split("");
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.9, triggerOnce: true });

  const pullupVariant = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * (delay || 0.05), // Default delay of 0.05 seconds if none is provided
      },
    }),
  };

  return (
    <div ref={ref} className="flex justify-center">
      {letters.map((letter, i) => (
        <motion.h1
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : "initial"} // Animate only when in view
          custom={i}
          className={cn(
            "font-display text-center  text-lg md:text-2xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white  md:leading-[5rem]",
            className
          )}
        >
          {letter === " " ? <span>&nbsp;</span> : letter}
        </motion.h1>
      ))}
    </div>
  );
}
