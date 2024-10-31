"use client";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function GradualSpacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.9, triggerOnce: true });

  return (
    <div ref={ref} className="flex justify-center space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // Animate only when in view
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: isInView ? i * delayMultiple : 0 }} // Delay only when in view
            className={cn("drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
