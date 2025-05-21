'use client';

import React, { useEffect, useState } from 'react';
import { getNeedPulse } from '../../systems/needPulse.js';
import { getCurrentEmotionIntensity, getCurrentGlowColor } from '../../systems/emotionEngine.js';

export default function InstitutionalOverlay() {
  const [pulse, setPulse] = useState(0);
  const [emotion, setEmotion] = useState(0);
  const [glowColorHex, setGlowColorHex] = useState('#6ed6ff'); // ✅ Clean hex for UI styling

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(getNeedPulse());
      setEmotion(getCurrentEmotionIntensity());

      // ✅ Safely convert THREE.Color to hex for display
      const color = getCurrentGlowColor();
      const colorHex = typeof color === 'string'
        ? color
        : color?.getStyle?.() || '#6ed6ff';

      setGlowColorHex(colorHex);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-mono shadow-md z-20"
      style={{
        backgroundColor: '#0f1117cc',
        color: glowColorHex,
        border: `1px solid ${glowColorHex}`,
      }}
    >
      <div>🧠 <strong>AGI Online</strong></div>
      <div>🎯 Emotion: {emotion.toFixed(2)}</div>
      <div>💡 Pulse: {pulse.toFixed(2)}</div>
      <div>🎨 Glow: {glowColorHex}</div>
    </div>
  );
}
