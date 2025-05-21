'use client';

import { useEffect, useRef } from 'react';
import { getEmotionGlowColor } from '@/systems/emotionEngine';

export default function GazeEyes() {
  const eyes = useRef([]);

  useEffect(() => {
    const onMove = (e) => {
      eyes.current.forEach((pupil) => {
        const parent = pupil?.parentElement;
        if (!parent) return;
        const rect = parent.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        const angle = Math.atan2(dy, dx);
        const r = 4; // pupil travel radius
        pupil.style.transform = `translate(${r * Math.cos(angle)}px, ${r * Math.sin(angle)}px)`;
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const glowColor = getEmotionGlowColor();

  return (
    <div className="flex justify-center gap-5 mb-2">
      {[0, 1].map((i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center"
          style={{
            boxShadow: `0 0 10px ${glowColor}`,
          }}
        >
          <div
            ref={(el) => (eyes.current[i] = el)}
            className="w-2 h-2 rounded-full transition-transform duration-150"
            style={{
              backgroundColor: glowColor,
            }}
          />
        </div>
      ))}
    </div>
  );
}
