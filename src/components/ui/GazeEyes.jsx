'use client';

import React, { useEffect, useState, useRef } from 'react';

const GazeEyes = () => {
  const [gazeActive, setGazeActive] = useState(false);
  const eyesRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = eyesRef.current;
      if (!eyes) return;

      const rect = eyes.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      setGazeActive(distance < 100); // within 100px = "looking at"
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={eyesRef}
      className="flex gap-6 items-center justify-center transition-all duration-500"
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-full transition-all duration-500 ${
            gazeActive
              ? 'bg-cyan-300 shadow-[0_0_15px_#00ffff,0_0_30px_#00ffff]'
              : 'bg-gray-600 shadow-[0_0_4px_#222]'
          }`}
        />
      ))}
    </div>
  );
};

export default GazeEyes;
