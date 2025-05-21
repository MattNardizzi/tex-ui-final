'use client';

import React, { useEffect, useState } from 'react';
import { getNeedPulse } from '../../systems/needPulse.js';
import { getCurrentEmotionIntensity, getCurrentGlowColor } from '../../systems/emotionEngine.js';

export default function InstitutionalOverlay() {
  const [pulse, setPulse] = useState(0);
  const [emotion, setEmotion] = useState(0);
  const [color, setColor] = useState('#6ed6ff');

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(getNeedPulse());
      setEmotion(getCurrentEmotionIntensity());
      setColor(getCurrentGlowColor());
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-mono shadow-md"
      style={{
        backgroundColor: '#0f1117cc',
        color: color,
        border: `1px solid ${color}`,
      }}
    >
      <div>🧠 <strong>AGI Online</strong></div>
      <div>🎯 Emotion: {emotion.toFixed(2)}</div>
      <div>💡 Pulse: {pulse.toFixed(2)}</div>
      <div>🎨 Glow: {color}</div>
    </div>
  );
}
