'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { getEmotionGlowColor } from '@/systems/emotionEngine';
import { createSpineShaderMaterial } from './SpineShaderMaterial';

import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import GazeEyes from './GazeEyes';
import MutationOverlay from '../MutationOverlay';

export default function StrategyCoreShell() {
  const mount = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // pure black

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.1, 3.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.2, // slightly reduced bloom intensity for clarity
        0.4,
        0.7
      )
    );

    // 🧠 AGI Plasma Spine
    const beamGeometry = new THREE.PlaneGeometry(0.045, 3.0, 1, 1); // slightly thicker and shorter
    const beamMaterial = createSpineShaderMaterial();
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.y = Math.PI;
    scene.add(beam);

    // ✨ Animate Spine
    const animate = () => {
      const t = performance.now() * 0.001;
      beamMaterial.uniforms.uTime.value = t;
      beamMaterial.uniforms.uColor.value.set(getEmotionGlowColor());
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mount} className="relative w-screen h-screen bg-black overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <GazeEyes />
      </div>

      <TypingPanel />
      <InstitutionalOverlay />
      <MutationOverlay />

      <div className="pointer-events-none absolute top-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
