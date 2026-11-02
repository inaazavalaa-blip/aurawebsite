"use client";

import { motion, useReducedMotion } from "motion/react";

/** Telón dorado al cambiar de página. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reducido = useReducedMotion();
  return (
    <>
      {!reducido && (
        <motion.div
          aria-hidden
          className="dorado pointer-events-none fixed inset-0 z-[80] origin-top"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      <motion.main
        initial={reducido ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </>
  );
}
