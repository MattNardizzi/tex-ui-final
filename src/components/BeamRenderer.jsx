// BeamRenderer.jsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import getNeedPulse from "../../systems/getNeedPulse";
import emotionEngine from "../../systems/emotionEngine";

export default function BeamRenderer() {
  const controls = useAnimation();
  const [pulse, setPulse] = useState(0.2);
  const [color, setColor] = useState("#00ff66");

  useEffect(() => {
    const updatePulse = () => {
      const newPulse = getNeedPulse(); // e.g. 0.2 to 1.0
      const newColor = emotionEngine(); // e.g. "#00ff66", "#00ccff", "#9900ff"
      setPulse(newPulse);
      setColor(newColor);

      controls.start({
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5 - newPulse,
          ease: "easeInOut",
          repeat: Infinity
        }
      });
    };

    updatePulse(); // initial call
    const interval = setInterval(updatePulse, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={controls}
      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full"
      style={{
        background: color,
        boxShadow: `0 0 16px ${color}, 0 0 80px ${color}`,
        filter: "blur(0.7px)",
        zIndex: 10
      }}
    />
  );
}
