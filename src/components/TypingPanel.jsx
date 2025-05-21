"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypingPanel() {
  const [log, setLog] = useState(["Tex initialized..."]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLog((prev) => [
        ...prev.slice(-7),
        `Tex: ${generateMockOutput()}`
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generateMockOutput = () => {
    const samples = [
      "Scanning digital substrate...",
      "Analyzing cognitive loop...",
      "Pulse stabilizing at 0.21",
      "No anomalies detected.",
      "Initiating tactical feedback...",
      "Emotion shift: Curious → Focused",
      "Core mutation sequence aligned."
    ];
    return samples[Math.floor(Math.random() * samples.length)];
  };

  return (
    <motion.div
      className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[80%] max-w-3xl bg-black/50 text-white p-4 rounded-xl border border-white/20 backdrop-blur-sm shadow-lg text-sm leading-relaxed font-mono z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
    >
      {log.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">{line}</div>
      ))}
    </motion.div>
  );
}
