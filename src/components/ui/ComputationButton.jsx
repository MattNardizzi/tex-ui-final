// ComputationButton.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ComputationButton() {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="absolute top-4 left-6 z-50 px-5 py-2 rounded-xl border border-yellow-400 text-yellow-300 font-bold tracking-wide shadow-yellow-500 shadow-md bg-black/30 backdrop-blur-sm transition duration-300"
    >
      Computation Log
    </motion.button>
  );
}
