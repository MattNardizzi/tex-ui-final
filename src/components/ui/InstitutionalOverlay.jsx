
import React, { useEffect, useState } from 'react';
import { getEmotionName, getEmotionPulseRate, getEmotionGlowColor } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';

export default function InstitutionalOverlay() {
  const [emotion, setEmotion] = useState('');
  const [pulse, setPulse] = useState(0);
  const [glow, setGlow] = useState('#00ffff');

  useEffect(() => {
    const update = () => {
      setEmotion(getEmotionName());
      setPulse(getNeedPulse().toFixed(2));
      setGlow(getEmotionGlowColor());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-6 text-xs font-mono text-white z-30 bg-black/40 px-4 py-2 rounded-md border border-gray-600">
      <div>
        <span className="text-gray-400">Emotion:</span>{' '}
        <span style={{ color: glow }}>{emotion}</span>
      </div>
      <div>
        <span className="text-gray-400">Pulse:</span>{' '}
        <span className="text-green-400">{pulse}</span>
      </div>
      <div>
        <span className="text-gray-400">State:</span> AGI Online
      </div>
    </div>
  );
}'use client';

import React, { useEffect, useState } from 'react';
import { getEmotionName, getEmotionPulseRate, getEmotionGlowColor } from '@/systems/emotionEngine';
import { getNeedPulse } from '@/systems/needPulse';

export default function InstitutionalOverlay() {
  const [emotion, setEmotion] = useState('');
  const [pulse, setPulse] = useState(0);
  const [glow, setGlow] = useState('#00ffff');

  useEffect(() => {
    const update = () => {
      setEmotion(getEmotionName());
      setPulse(getNeedPulse().toFixed(2));
      setGlow(getEmotionGlowColor());
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-6 text-xs font-mono text-white z-30 bg-black/40 px-4 py-2 rounded-md border border-gray-600">
      <div>
        <span className="text-gray-400">Emotion:</span>{' '}
        <span style={{ color: glow }}>{emotion}</span>
      </div>
      <div>
        <span className="text-gray-400">Pulse:</span>{' '}
        <span className="text-green-400">{pulse}</span>
      </div>
      <div>
        <span className="text-gray-400">State:</span> AGI Online
      </div>
    </div>
  );
}
