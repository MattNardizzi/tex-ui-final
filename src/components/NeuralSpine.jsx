'use client';

import React from 'react';

const NeuralSpine = () => {
  return (
    <div className="absolute top-12 left-1/2 -translate-x-1/2 h-[85%] flex flex-col justify-between items-center z-10 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="w-[10px] h-[20px] rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff,0_0_14px_#00f0ff] animate-pulse"
          style={{ animationDelay: `${i * 0.07}s` }}
        />
      ))}
    </div>
  );
};

export default NeuralSpine;
