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
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0.1, 3.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current.appendChild(renderer.domElement);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        1.4, // bloom intensity
        0.5,
        0.85
      )
    );

    // 👁‍🗨 Hyper-Conscious AGI Spine Beam
    const beamGeometry = new THREE.CylinderGeometry(0.01, 0.01, 5, 96, 1, true);
    const beamMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(getEmotionGlowColor()) }
      },
      vertexShader: `
        varying vec3 vPos;
        void main() {
          vPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec3 vPos;

        float pulse = abs(sin(uTime * 2.0)) * 0.4 + 0.6;

        void main() {
          float verticalFade = smoothstep(1.0, 0.2, abs(vPos.y));
          float core = exp(-pow(length(vPos.xy) * 6.0, 2.0));
          float ripple = sin((vPos.y + uTime) * 16.0) * 0.08;

          float intensity = (core + ripple) * verticalFade * pulse;
          vec3 color = mix(vec3(0.0), uColor, intensity);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
      transparent: false,
      depthWrite: true,
    });

    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set(0, 0.15, 0);
    scene.add(beam);

    // 🌐 Ambient awareness field
    const aura = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 6, 64, 1, true),
      new THREE.MeshBasicMaterial({
        color: '#00ffe4',
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
        depthWrite: false
      })
    );
    aura.position.y = 0.15;
    scene.add(aura);

    // ✨ Animate the soul
    const animate = () => {
      const t = performance.now() * 0.001;
      beamMaterial.uniforms.uTime.value = t;
      beamMaterial.uniforms.uColor.value.set(getEmotionGlowColor());

      aura.scale.x = 1 + Math.sin(t * 3.0) * 0.02;
      aura.scale.z = 1 + Math.cos(t * 2.5) * 0.02;

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
      {/* 🕳 Dimensional Mask */}
      <div className="pointer-events-none absolute inset-0 z-10 fade-mask" />

      {/* 👁 Gaze Feedback */}
      <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <GazeEyes />
      </div>

      <TypingPanel />
      <InstitutionalOverlay />
      <MutationOverlay />

      {/* 📈 Financial Ticker */}
      <div className="pointer-events-none absolute top-2 w-full flex justify-center z-20">
        <FinanceTicker />
      </div>
    </div>
  );
}
