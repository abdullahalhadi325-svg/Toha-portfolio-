'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'motion/react';

interface ScrollRevealProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delayMs?: number;
}

export const sectionContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const staggerChildVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const ScrollRevealSection: React.FC<ScrollRevealProps> = ({
  children,
  id,
  className = '',
  delayMs = 0,
}) => {
  return (
    <motion.section
      id={id}
      variants={sectionContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: delayMs / 1000 }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div variants={staggerChildVariants} className={className}>
      {children}
    </motion.div>
  );
};
