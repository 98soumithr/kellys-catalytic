'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'none';

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 20 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered reveal matching the reference's framer-motion `whileInView`
 * behaviour (fade + small translate, played once). Collapses to a plain fade-free
 * render when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  as?: 'div' | 'section' | 'h1' | 'h2' | 'p' | 'span';
}) {
  const reduced = useReducedMotion();
  const { x, y } = OFFSET[direction];

  const variants: Variants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: 'easeOut' },
    },
  };

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
