'use client';

import React, { useEffect, useState } from 'react';
import { getNeedPulse } from '@/systems/needPulse';
import { getCurrentEmotionIntensity, getCurrentGlowColor } from '@/systems/emotionEngine';

export default function InstitutionalOverlay({ onStateChange }) {
  const [pulse, setPulse] = useState(0.4);
  const [emotion, setEmotion] = useState(0.6);
  const [glowColor, setGlowColor] = useState('#00ffaa');

  useEffect(() => {
    const interval = setInterval(() => {
      const p = getNeedPulse();
      const e = getCurrentEmotionIntensity();
      const c = getCurrentGlowColor();

      setPulse(p);
      setEmotion(e);
      setGlowColor(typeof c === 'string' ? c : c?.getStyle?.() || '#00ffaa');

      if (onStateChange) {
        onStateChange({ pulse: p, emotion: e, glowColor: c });
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="absolute top-6 right-6 px-4 py-2 rounded-lg text-sm font-mono shadow-md z-20"
      style={{
        backgroundColor: '#0f1117cc',
        color: glowColor,
        border: `1px solid ${glowColor}`,
      }}
    >
      <div>🧠 <strong>AGI Online</strong></div>
      <div>🎯 Emotion: {emotion.toFixed(2)}</div>
      <div>💡 Pulse: {pulse.toFixed(2)}</div>
      <div>🎨 Glow: {glowColor}</div>
    </div>
  );
}
