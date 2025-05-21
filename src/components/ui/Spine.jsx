'use client';

import React from 'react';

export default function Spine({ glowColor = '#00ffaa', pulse = 1 }) {
  const glow = glowColor;

  return (
    <>
      <style jsx>{`
        @keyframes pulse-spine {
          0%, 100% {
            opacity: ${0.2 + pulse * 0.1};
            transform: scaleY(1);
          }
          50% {
            opacity: ${0.7 + pulse * 0.3};
            transform: scaleY(1.03);
          }
        }
      `}</style>

      <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 z-10">
        <div
          className="w-full h-full bg-gradient-to-b from-green-400 via-green-300 to-transparent animate-pulse-spine opacity-80"
          style={{
            background: `linear-gradient(to bottom, ${glow}, ${glow}33, transparent)`,
          }}
        />
      </div>
    </>
  );
}
