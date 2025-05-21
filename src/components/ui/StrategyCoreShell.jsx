'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { createNoise2D } from 'simplex-noise';

import { getNeedPulse } from '@/systems/needPulse';
import { getEmotionGlowColor, getEmotionPulseRate } from '@/systems/emotionEngine';

import TypingPanel from './TypingPanel.jsx';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import GazeEyes from './GazeEyes';
import MutationOverlay from './MutationOverlay';

const CFG = {
  breathPeriod: 4.5,
  emaAlpha: 0.05,
  beamRadius: 0.017,
  beamHeight: 1.35,
};

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.12, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.55, 0.25, 0.75)
    );

    const beamMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pulse: { value: 1 },
        glowColor: { value: new THREE.Color('#6ed6ff') },
      },
      transparent: true,
      vertexShader: `
        uniform float time, pulse;
        varying vec3 vPos;
        void main() {
          vPos = position;
          vec3 p = position;
          p.x += sin(time * 2. + position.y * 4.) * 0.006 * pulse;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float pulse;
        varying vec3 vPos;
        void main() {
          float intensity = (1.0 - abs(vPos.y) / 1.1) * pulse;
          gl_FragColor = vec4(glowColor * intensity * 1.4, 1.0);
        }
      `,
    });

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(CFG.beamRadius, CFG.beamRadius, CFG.beamHeight, 48),
      beamMat
    );
    scene.add(beam);

    const noise2D = createNoise2D();
    const animateHooks = [];
    let t = 0;
    let smooth = getNeedPulse();

    const animate = () => {
      t += 0.0065;
      const breath = (Math.sin((t / CFG.breathPeriod) * Math.PI * 2) + 1) / 2;
      const pulseRate = getEmotionPulseRate();
      smooth += CFG.emaAlpha * (Math.min(1, breath * 0.7) - smooth);

      beamMat.uniforms.time.value = t;
      beamMat.uniforms.pulse.value = smooth * pulseRate + 0.15;

      const glowTarget = new THREE.Color(getEmotionGlowColor());
      beamMat.uniforms.glowColor.value.lerp(glowTarget, 0.05);

      beam.scale.set(1 + smooth * 0.15, 1, 1);
      beam.position.x = Math.sin(t * 1.1) * 0.008 + noise2D(t * 0.3, 0) * 0.003;

      animateHooks.forEach((fn) => fn(t));
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      mount.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      {/* 🌑 Fade Overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />

      {/* 👁 Gaze Eyes */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <GazeEyes />
      </div>

      {/* 💬 Typing Input */}
      <TypingPanel />

      {/* 🧠 State Overlay */}
      <InstitutionalOverlay />

      {/* 🔄 Mutation Feed */}
      <MutationOverlay />

      {/* 📈 Market Ticker */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
