import React from 'react';
import {motion} from 'framer-motion';

// Shared easing curve used across the docs so motion feels consistent.
const EASE = [0.22, 1, 0.36, 1];

// Reveal fades and lifts a block into view the first time it scrolls on screen.
// Server-rendered output keeps the content in the DOM, so search and no-JS
// readers still get everything; the animation is progressive enhancement.
export function Reveal({children, delay = 0, y = 24, className}) {
  return (
    <motion.div
      className={className}
      initial={{opacity: 0, y}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.6, delay, ease: EASE}}>
      {children}
    </motion.div>
  );
}

// Stagger animates its direct StaggerItem children one after another.
export function Stagger({children, className, gap = 0.08}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{once: true, margin: '-80px'}}
      variants={{hidden: {}, show: {transition: {staggerChildren: gap}}}}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({children, className, y = 20}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {opacity: 0, y},
        show: {opacity: 1, y: 0, transition: {duration: 0.5, ease: EASE}},
      }}>
      {children}
    </motion.div>
  );
}
