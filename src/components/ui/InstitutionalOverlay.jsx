'use client';

import React from 'react';
import { useEmotion } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';

export default function InstitutionalOverlay() {
  const { emotionColor, emotionName, pulseRate } = useEmotion();
  const pulse = getNeedPulse()?.toFixed(2) || '0.00';

  return (
    <div
      className="absolute top-4 right-6 text-xs font-mono z-30 px-4 py-3 rounded-md border backdrop-blur-md border-neutral-700 shadow-lg"
      style={{
        background: 'rgba(0, 0, 0, 0.4)',
        color: '#ffffff',
        borderColor: emotionColor.getStyle(),
        boxShadow: `0 0 10px ${emotionColor.getStyle()}66`,
      }}
    >
      <div>
        <span className="text-gray-400">Emotion:</span>{' '}
        <span style={{ color: emotionColor.getStyle(), fontWeight: 'bold' }}>
          {emotionName}
        </span>
      </div>
      <div>
        <span className="text-gray-400">Pulse:</span>{' '}
        <span className="text-green-400">{pulse}</span>
      </div>
      <div>
        <span className="text-gray-400">State:</span>{' '}
        <span className="text-white">AGI Online</span>
      </div>
    </div>
  );
}
