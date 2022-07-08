import type { HTMLMotionProps } from "framer-motion";

export const fadeAndGrowAnimation: Partial<HTMLMotionProps<any>> = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
};
