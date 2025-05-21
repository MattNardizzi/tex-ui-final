'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { getNeedPulse } from '@/systems/needPulse';
import {
  getEmotionGlowColor,
  getEmotionPulseRate,
} from '@/systems/emotionEngine';

import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import GazeEyes from './GazeEyes';
import MutationOverlay from '../MutationOverlay';

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      58,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.12, 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.4,
        0.6
      )
    );

    const beamMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pulse: { value: 1 },
        glowColor: { value: new THREE.Color('#00faff') },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.x += sin(time * 2. + pos.y * 4.) * 0.01;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 glowColor;
        uniform float pulse;
        varying vec2 vUv;
        void main() {
          float dist = abs(vUv.x - 0.5) * 2.0;
          float core = 1.0 - smoothstep(0.0, 0.3, dist);
          float glow = 1.0 - smoothstep(0.3, 1.0, dist);
          vec3 color = glowColor * (core * 2.5 + glow * pulse * 1.2);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 1.5, 64),
      beamMat
    );
    scene.add(beam);

    let t = 0;

    const animate = () => {
      t += 0.008;
      beamMat.uniforms.time.value = t;
      beamMat.uniforms.pulse.value = getNeedPulse() * getEmotionPulseRate();
      beamMat.uniforms.glowColor.value.lerp(
        new THREE.Color(getEmotionGlowColor()),
        0.1
      );
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

      {/* 💬 Input */}
      <TypingPanel />

      {/* 🧠 Cognitive State Overlay */}
      <InstitutionalOverlay />

      {/* 🧬 Mutation Stream */}
      <MutationOverlay />

      {/* 📈 Market Strip */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
