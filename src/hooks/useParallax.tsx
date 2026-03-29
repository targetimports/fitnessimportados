import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface UseParallaxOptions {
  offset?: number;
  direction?: "up" | "down";
}

export const useParallax = (options: UseParallaxOptions = {}) => {
  const { offset = 50, direction = "up" } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const yValue = direction === "up" ? [offset, -offset] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], yValue);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return { ref, y, opacity, scale, scrollYProgress };
};

export const useParallaxImage = (speed: number = 0.5) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);

  return { ref, y, scrollYProgress };
};
