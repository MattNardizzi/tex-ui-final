import * as THREE from 'three';

export function createCoreRingShaderMaterial(emotionColor = '#00faff') {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(emotionColor) },
    },
    vertexShader: `
      varying vec2 vUv;
      varying float vAngle;

      void main() {
        vUv = uv;

        // Calculate angle for subtle spin
        vAngle = atan(position.y, position.x);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;

      uniform vec3 uColor;
      uniform float uTime;
      varying vec2 vUv;
      varying float vAngle;

      void main() {
        // Distance from center
        float dist = length(vUv - 0.5);

        // Smooth ring band
        float outer = smoothstep(0.3, 0.28, dist);
        float inner = smoothstep(0.22, 0.20, dist);
        float band = outer * (1.0 - inner);

        // Spiral shimmer
        float spiral = sin(vAngle * 12.0 + uTime * 3.0) * 0.5 + 0.5;

        // Flickering pulse
        float pulse = 0.8 + 0.2 * sin(uTime * 4.0 + dist * 25.0);

        float glow = band * spiral * pulse;

        vec3 color = uColor * glow * 1.8;

        float alpha = clamp(glow, 0.0, 1.0);
        gl_FragColor = vec4(color, alpha);
      }
    `,
    side: THREE.DoubleSide,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}
