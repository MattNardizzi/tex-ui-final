'use client';

import React, { useState } from 'react';

const TypingPanel = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // connect to Tex logic
    setInput('');
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-30">
      {/* Glowing background */}
      <div className="absolute inset-0 rounded-xl blur-md bg-green-400 opacity-15 pointer-events-none" />

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-4">
        <textarea
          className="w-full p-4 bg-[#0a0f1c] text-white rounded-lg focus:outline-none"
          placeholder="Ask Tex anything..."
          autoCorrect="on"
          autoCapitalize="sentences"
          spellCheck={true}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* Submit button with broken glowing ring */}
        <button
          type="submit"
          className="relative w-28 h-12 self-center text-white font-semibold group"
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(34, 197, 94, 0.8)"
              strokeWidth="3"
              strokeDasharray="220"
              strokeDashoffset="40"
              className="animate-pulse"
            />
          </svg>
          <span className="relative z-10">Submit</span>
        </button>
      </form>
    </div>
  );
};

export default TypingPanel;
