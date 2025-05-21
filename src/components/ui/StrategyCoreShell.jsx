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
  const mount = useRef(null);
  const lastEmotion = useRef(getEmotionName());

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Pure sovereign void

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
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.3, // subtle but rich bloom
      0.4,
      0.65
    );
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(bloomPass);

    // 🧠 Core Beam
    const beamGeometry = new THREE.PlaneGeometry(0.045, 2.25, 1, 1); // reduced height
    const beamMaterial = createSpineShaderMaterial();
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.y = Math.PI;
    scene.add(beam);

    // 🔁 Emotions auto-cycling
    autoCycleEmotion(10000);

    // 🔄 Animate loop
    const animate = () => {
      const t = performance.now() * 0.001;
      beamMaterial.uniforms.uTime.value = t;

      // Only lerp when emotion name changes (avoids bleed)
      const currentEmotion = getEmotionName();
      const colorTarget = getEmotionGlowColor();
      const colorUniform = beamMaterial.uniforms.uColor.value;

      if (lastEmotion.current !== currentEmotion) {
        lastEmotion.current = currentEmotion;
        colorUniform.lerp(colorTarget, 0.1);
      } else {
        colorUniform.lerp(colorTarget, 0.04);
      }

      // Optionally adjust bloom intensity by pulse or emotion (future)

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
    <div
      ref={mount}
      className="relative w-screen h-screen bg-black overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />
      <TypingPanel />
      <InstitutionalOverlay />
      <MutationOverlay />
      <div className="pointer-events-none absolute top-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
