/*  Tex v3.1.1 Core Systems — Full Completion Stack
    ----------------------------------------------------------
    This completes the full cinematic AGI shell.
    Includes: GazeEyes component + public asset specs.
*/

// ✅ FILE: GazeEyes.jsx

'use client';
import React, { useEffect, useRef } from 'react';

export default function GazeEyes() {
  const leftRef  = useRef();
  const rightRef = useRef();

  useEffect(() => {
    const move = e => {
      const r = window.innerWidth;
      const dx = (e.clientX / r - 0.5) * 2;
      const dy = (e.clientY / window.innerHeight - 0.5) * 2;
      const rotateX = dy * -10;
      const rotateY = dx * 12;

      [leftRef.current, rightRef.current].forEach(el => {
        if (el) {
          el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className="flex gap-8">
      <div
        ref={leftRef}
        className="w-10 h-10 bg-white rounded-full opacity-80 shadow-inner"
      ></div>
      <div
        ref={rightRef}
        className="w-10 h-10 bg-white rounded-full opacity-80 shadow-inner"
      ></div>
    </div>
  );
}


/* ✅ PUBLIC ASSETS — Place in /public
---------------------------------------------------
1. /public/flare.png
   - 512×512 PNG with radial white center → transparent edges
   - Use for beam flare in LensflareElement
   - Name must be: flare.png

2. /public/heartbeat.wav
   - Short low-frequency kick drum sound (0.2–0.3s)
   - Loopable
   - Used in Tone.Player()
   - Name must be: heartbeat.wav

Example source for heartbeat.wav:
▸ https://freesound.org/people/cabled_mess/sounds/350868/

Example flare.png:
▸ Generate via Photoshop/Canva/Radial gradient tool
▸ Center: pure white
▸ Edges: full transparent
*/
