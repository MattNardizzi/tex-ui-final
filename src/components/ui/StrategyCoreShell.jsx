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
    scene.background = new THREE.Color(0x000000);

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
        1.5, // intensity
        0.5,
        0.85
      )
    );

    // 🧠 Sovereign Cognition Spine
    const beamGeometry = new THREE.PlaneGeometry(0.03, 3.2, 1, 1);
    const beamMaterial = createSpineShaderMaterial();
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.rotation.y = Math.PI;
    scene.add(beam);

    // 💿 Base Emitter Ring
    const ringGeometry = new THREE.RingGeometry(0.2, 0.4, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: '#00faff',
      transparent: true,
      opacity: 0.15,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -1.6;
    scene.add(ring);

    // 🌌 Energy Shell Field
    const field = new THREE.Mesh(
      new THREE.SphereGeometry(2.8, 64, 64),
      new THREE.MeshBasicMaterial({
        color: '#003344',
        transparent: true,
        opacity: 0.05,
        wireframe: true,
        depthWrite: false,
      })
    );
    scene.add(field);

    // ✨ Animate Spine, Ring & Field
    const animate = () => {
      const t = performance.now() * 0.001;

      beamMaterial.uniforms.uTime.value = t;
      beamMaterial.uniforms.uColor.value.set(getEmotionGlowColor());

      ring.rotation.z = t * 0.2;
      ring.material.opacity = 0.15 + Math.sin(t * 2) * 0.05;

      field.rotation.y = t * 0.03;

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
