'use client';

import React, { useState } from 'react';

const TypingPanel = () => {
  const [input, setInput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Connect to Tex logic
    setInput('');
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        {/* Input Box */}
        <input
          type="text"
          placeholder="Ask Tex anything..."
          className="w-full py-3 px-4 pr-12 rounded-xl bg-black bg-opacity-70 text-white placeholder-gray-400 focus:outline-none shadow-lg"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />

        {/* Glowing Green Circle Button */}
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-2 border-green-400"
          style={{
            boxShadow: '0 0 8px 3px rgba(0, 255, 100, 0.6)',
          }}
        />
      </form>
    </div>
  );
};

export default TypingPanel;
