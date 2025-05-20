'use client';

import React, { useEffect, useState } from 'react';

const GazeEyes = () => {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => (prev === 1 ? 1.3 : 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 items-center justify-center">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00ffff,0_0_20px_#00ffff] transition-transform duration-500"
          style={{ transform: `scale(${pulse})` }}
        />
      ))}
    </div>
  );
};

export default GazeEyes;
