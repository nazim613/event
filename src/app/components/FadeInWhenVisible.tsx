// File: app/components/FadeInWhenVisible.tsx
'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

interface Props {
  children: ReactNode;
  delay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'zoomIn' | 'flipIn';
}

const animationVariants: Record<string, Variants> = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  slideUp: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
  slideLeft: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
  zoomIn: { hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } },
  flipIn: { hidden: { rotateY: 90, opacity: 0 }, visible: { rotateY: 0, opacity: 1 } },
};

export const FadeInWhenVisible: React.FC<Props> = ({
  children,
  delay = 0,
  animation = 'fadeIn',
}) => {
  const variant = animationVariants[animation] || animationVariants.fadeIn;

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      {children}
    </motion.div>
  );
};
