'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import {
  getEmotionGlowColor,
  getEmotionName,
  autoCycleEmotion,
} from '@/systems/emotionEngine';

import { createSpineShaderMaterial } from './SpineShaderMaterial';
import TypingPanel from '../TypingPanel';
import InstitutionalOverlay from './InstitutionalOverlay';
import FinanceTicker from './FinanceTicker';
import MutationOverlay from '../MutationOverlay';

export default function StrategyCoreShell() {
  const mountRef = useRef(null);
  const lastEmotionRef = useRef(getEmotionName());

  useEffect(() => {
    // 🧠 Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // 🎥 Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.1, 3.2);

    // 🖥️ Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // ✨ Postprocessing (bloom)
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.3,
        0.4,
        0.65
      )
    );

    // 🌐 Core Beam (final, tuned dimensions)
    const beamGeometry = new THREE.PlaneGeometry(0.0675, 2.75, 1, 1);
    const beamMaterial = createSpineShaderMaterial();
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.y = Math.PI;
    scene.add(beam);

    // 🔁 Auto cycle through emotions
    autoCycleEmotion(10000);

    // 🔄 Animate render loop
    const animate = () => {
      const t = performance.now() * 0.001;
      beamMaterial.uniforms.uTime.value = t;

      const currentEmotion = getEmotionName();
      const targetColor = getEmotionGlowColor();
      const activeColor = beamMaterial.uniforms.uColor.value;

      if (lastEmotionRef.current !== currentEmotion) {
        lastEmotionRef.current = currentEmotion;
        activeColor.lerp(targetColor, 0.1);
      } else {
        activeColor.lerp(targetColor, 0.04);
      }

      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    // 📏 Handle resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      composer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // 🧼 Cleanup on destroy
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      {/* Fade overlay */}
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />

      {/* AGI UI Modules */}
      <TypingPanel />
      <InstitutionalOverlay />
      <MutationOverlay />

      {/* Market HUD */}
      <div className="pointer-events-none absolute top-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
