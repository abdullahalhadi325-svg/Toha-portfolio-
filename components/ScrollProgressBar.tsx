'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[70] pointer-events-none bg-transparent">
      <motion.div
        className="h-full bg-[#C5A880] origin-left"
        style={{ scaleX }}
      />
    </div>
  );
}
