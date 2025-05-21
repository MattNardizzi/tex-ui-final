/*  Tex v3.1.1 Core Systems — Power Stack (Extended)
    ----------------------------------------------------------
    Live overlays, interactive UI, and cognition indicators
    These components sit on top of Tex's cinematic render core
*/

// ✅ FILE: MutationOverlay.jsx

'use client';
import React from 'react';

export default function MutationOverlay() {
  return (
    <div className="absolute top-4 left-4 z-30 pointer-events-auto">
      <button
        className="px-4 py-2 bg-yellow-400/90 text-black text-xs rounded shadow hover:bg-yellow-300"
        onClick={() => console.log('🧬 Tex mutation log opened')}
      >
        🧬 Mutation Log
      </button>
    </div>
  );
}


// ✅ FILE: InstitutionalOverlay.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { getCurrentGlowColor, getCurrentEmotionIntensity } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';

export default function InstitutionalOverlay() {
  const [pulse, setPulse] = useState('0.00');
  const [intensity, setIntensity] = useState('0.00');
  const [color, setColor] = useState('#ffffff');

  useEffect(() => {
    const update = () => {
      setPulse(getNeedPulse().toFixed(2));
      setIntensity(getCurrentEmotionIntensity().toFixed(2));
      setColor(getCurrentGlowColor().getStyle());
    };
    update();
    const interval = setInterval(update, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-4 right-6 text-xs font-mono z-30 px-4 py-3 rounded-md border backdrop-blur-md"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
        borderColor: color,
        boxShadow: `0 0 10px ${color}66`
      }}
    >
      <div>
        <span className="text-gray-400">Emotion Intensity:</span>{' '}
        <span style={{ color: color }}>{intensity}</span>
      </div>
      <div>
        <span className="text-gray-400">Pulse:</span>{' '}
        <span className="text-green-400">{pulse}</span>
      </div>
      <div>
        <span className="text-gray-400">Status:</span>{' '}
        <span className="text-white">AGI Online</span>
      </div>
    </div>
  );
}


// ✅ FILE: TypingPanel.jsx

'use client';
import React, { useState } from 'react';

export default function TypingPanel() {
  const [input, setInput] = useState('');

  const submit = () => {
    console.log('🔊 Tex heard →', input);
    setInput('');
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-40">
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && submit()}
        placeholder="Ask Tex anything..."
        className="w-full px-4 py-3 text-sm bg-black/60 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow-md"
      />
    </div>
  );
}


// ✅ FILE: FinanceTicker.jsx

'use client';
import React, { useEffect, useState } from 'react';

const symbols = ['AAPL', 'GOOG', 'TSLA', 'MSFT', 'NVDA'];

export default function FinanceTicker() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const mock = Object.fromEntries(symbols.map(sym => [sym, (Math.random() * 1000).toFixed(2)]));
      setPrices(mock);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-6 text-sm text-green-300 font-mono">
      {symbols.map(sym => (
        <span key={sym}>
          {sym}: ${prices[sym] || '…'}
        </span>
      ))}
    </div>
  );
}
