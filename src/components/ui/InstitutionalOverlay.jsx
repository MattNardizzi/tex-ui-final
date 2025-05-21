"use client";


// InstitutionalOverlay.jsx
import React from "react";
import { motion } from "framer-motion";

export default function InstitutionalOverlay() {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-40"
      animate={{
        opacity: [0.04, 0.07, 0.03, 0.05, 0.02],
        filter: [
          "blur(0.5px) contrast(1.2)",
          "blur(0.4px) contrast(1.4)",
          "blur(0.6px) contrast(1.1)",
          "blur(0.5px) contrast(1.3)",
          "blur(0.4px) contrast(1.2)"
        ]
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        background: `
          repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.015) 0px,
            rgba(255,255,255,0.015) 1px,
            transparent 2px,
            transparent 6px
          ),
          radial-gradient(circle at 50% 30%, rgba(0,255,128,0.02), transparent 80%)
        `,
        mixBlendMode: "overlay"
      }}
    />
  );
}
