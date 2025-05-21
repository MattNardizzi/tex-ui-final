'use client';

import React, { useState, useEffect } from 'react';

export default function TypingPanel() {
  const [input, setInput] = useState('');
  const [lastTyped, setLastTyped] = useState('');

  useEffect(() => {
    if (input.trim() !== '') {
      setLastTyped(input);
    }
  }, [input]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // ⬇️ You can connect this to Tex's brain later
      console.log('[Tex] →', input);
      setInput('');
    }
  };

  return (
    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[70%]">
      <input
        type="text"
        placeholder="Ask Tex anything..."
        value={input}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        className="w-full px-4 py-3 bg-black/80 text-white text-lg rounded-xl border border-[#6ed6ff] shadow-lg focus:outline-none focus:ring-2 focus:ring-[#6ed6ff] transition-all duration-150 placeholder-gray-400"
      />
      {lastTyped && (
        <div className="mt-2 text-sm text-[#6ed6ff] tracking-wide">
          Last command: <span className="italic">{lastTyped}</span>
        </div>
      )}
    </div>
  );
}
