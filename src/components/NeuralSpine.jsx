'use client';

import React from 'react';

const NeuralSpine = () => {
  return (
    <div className="relative w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center [perspective:1000px]">
        <div className="flex flex-col items-center gap-2 [transform-style:preserve-3d] rotate-x-[45deg]">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-[20px] h-[40px] bg-red-500"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeuralSpine;
