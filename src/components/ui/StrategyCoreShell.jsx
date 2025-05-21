'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { getEmotionGlowColor } from '@/systems/emotionEngine';

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
        0.7,
        0.4,
        0.5
      )
    );

    // 🔷 Beam: stable, bright, alive
    const beamMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00faff'),
      emissive: new THREE.Color('#00faff'),
      emissiveIntensity: 1.8,
      metalness: 0.3,
      roughness: 0.15,
      transparent: false,
    });

    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 1.5, 64),
      beamMaterial
    );
    scene.add(beam);

    // 💡 Light (optional shimmer)
    const light = new THREE.PointLight('#00faff', 1.5, 3);
    light.position.set(0.1, 0.3, 0.4);
    scene.add(light);

    // 🎞️ Animate
    const animate = () => {
      beamMaterial.emissive.set(getEmotionGlowColor());
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    // 📐 Resize
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

      {/* 👁 Gaze Feedback */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <GazeEyes />
      </div>

      {/* 💬 Typing Input */}
      <TypingPanel />

      {/* 🧠 System Overlay */}
      <InstitutionalOverlay />

      {/* 🔄 Mutation Display */}
      <MutationOverlay />

      {/* 📈 Market Strip */}
      <div className="pointer-events-none absolute bottom-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
