import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

export const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1500);
    camera.position.z = 180;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);
    container.appendChild(renderer.domElement);

    // Post-processing: EffectComposer + UnrealBloomPass
    let composer: EffectComposer | null = null;
    try {
      composer = new EffectComposer(renderer);
      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height),
        0.8, // Strength: 0.8
        0.1, // Radius: 0.1
        1.0  // Threshold: 1.0
      );
      composer.addPass(bloomPass);
    } catch (e) {
      console.warn('Post-processing fallback to default renderer', e);
      composer = null;
    }

    // ----------------------------------------------------
    // 15,000 Particles
    // ----------------------------------------------------
    const particleCount = 15000;
    const particleGeo = new THREE.BufferGeometry();

    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions
    // Base: subtle starlight monochrome -> rgb(38, 38, 42)
    const baseR = 38 / 255;
    const baseG = 38 / 255;
    const baseB = 42 / 255;

    // Accent: #CCFF00 -> rgb(204, 255, 0)
    const accentR = 204 / 255;
    const accentG = 255 / 255;
    const accentB = 0 / 255;

    // Spread particles across a wide volumetric frustum
    const spreadX = 400;
    const spreadY = 260;
    const spreadZ = 350;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (Math.random() - 0.5) * spreadX * 2;
      const y = (Math.random() - 0.5) * spreadY * 2;
      const z = (Math.random() - 0.5) * spreadZ * 2;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // Slight natural variance in particle base tone
      const variance = 0.8 + Math.random() * 0.4;
      colors[i3] = baseR * variance;
      colors[i3 + 1] = baseG * variance;
      colors[i3 + 2] = baseB * variance;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // ----------------------------------------------------
    // 530 Energy Lines Moving Forward in Z-space
    // ----------------------------------------------------
    const lineCount = 530;
    const lineLength = 28;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(lineCount * 2 * 3);
    const lineZSpeeds = new Float32Array(lineCount);

    for (let i = 0; i < lineCount; i++) {
      const idx = i * 6;
      const x = (Math.random() - 0.5) * spreadX * 1.8;
      const y = (Math.random() - 0.5) * spreadY * 1.8;
      const z = (Math.random() - 0.5) * spreadZ * 2.5;

      // Start vertex
      linePositions[idx] = x;
      linePositions[idx + 1] = y;
      linePositions[idx + 2] = z;

      // End vertex (extending backwards in Z)
      linePositions[idx + 3] = x;
      linePositions[idx + 4] = y;
      linePositions[idx + 5] = z - lineLength;

      // Speed moving towards camera (positive Z)
      lineZSpeeds[i] = 1.2 + Math.random() * 2.2;
    }

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const energyLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(energyLines);

    // ----------------------------------------------------
    // Pointer Interaction & Repulsion Physics
    // ----------------------------------------------------
    const pointerWorld = new THREE.Vector3(9999, 9999, 0);
    const targetPointerWorld = new THREE.Vector3(9999, 9999, 0);
    const planeZ0 = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();
    const mouseNormalized = new THREE.Vector2(-999, -999);

    const handlePointerMove = (e: MouseEvent) => {
      mouseNormalized.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNormalized.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouseNormalized, camera);
      const intersection = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(planeZ0, intersection)) {
        targetPointerWorld.copy(intersection);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (composer) {
        composer.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // ----------------------------------------------------
    // Animation Loop
    // ----------------------------------------------------
    let animationFrameId: number;
    let lastTime = performance.now();

    const repulsionRadius = 20.0;
    const repulsionForceMult = 0.04;
    const maxMixMult = 0.4;
    const springFactor = 0.055;
    const damping = 0.88;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth pointer interpolation
      pointerWorld.lerp(targetPointerWorld, 0.12);

      // 1. Update Particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = particleGeo.attributes.color as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;
      const colArray = colAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        const px = posArray[i3];
        const py = posArray[i3 + 1];
        const pz = posArray[i3 + 2];

        // 3D distance to pointer
        const dx = px - pointerWorld.x;
        const dy = py - pointerWorld.y;
        const dz = pz - pointerWorld.z;
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < repulsionRadius * repulsionRadius) {
          const dist = Math.sqrt(distSq);
          const force = (1.0 - dist / repulsionRadius) * repulsionForceMult * 20;

          // Repel outward
          velocities[i3] += (dx / (dist + 0.001)) * force;
          velocities[i3 + 1] += (dy / (dist + 0.001)) * force;
          velocities[i3 + 2] += (dz / (dist + 0.001)) * force;

          // Interpolate color towards #CCFF00 (max mix 0.4)
          const mixVal = (1.0 - dist / repulsionRadius) * maxMixMult;
          colArray[i3] = THREE.MathUtils.lerp(colArray[i3], accentR, mixVal);
          colArray[i3 + 1] = THREE.MathUtils.lerp(colArray[i3 + 1], accentG, mixVal);
          colArray[i3 + 2] = THREE.MathUtils.lerp(colArray[i3 + 2], accentB, mixVal);
        }

        // Spring return force towards original position
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        velocities[i3] += (ox - px) * springFactor;
        velocities[i3 + 1] += (oy - py) * springFactor;
        velocities[i3 + 2] += (oz - pz) * springFactor;

        // Apply damping
        velocities[i3] *= damping;
        velocities[i3 + 1] *= damping;
        velocities[i3 + 2] *= damping;

        // Integrate positions
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Color decay back to neutral starlight base
        colArray[i3] = THREE.MathUtils.lerp(colArray[i3], baseR, 0.03);
        colArray[i3 + 1] = THREE.MathUtils.lerp(colArray[i3 + 1], baseG, 0.03);
        colArray[i3 + 2] = THREE.MathUtils.lerp(colArray[i3 + 2], baseB, 0.03);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // 2. Update Energy Lines
      const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      for (let i = 0; i < lineCount; i++) {
        const idx = i * 6;
        const speed = lineZSpeeds[i];

        linePosArray[idx + 2] += speed;
        linePosArray[idx + 5] += speed;

        // Wrap around when past camera
        if (linePosArray[idx + 2] > camera.position.z + 50) {
          const newZ = -spreadZ * 1.5 - Math.random() * 100;
          linePosArray[idx + 2] = newZ;
          linePosArray[idx + 5] = newZ - lineLength;
          linePosArray[idx] = (Math.random() - 0.5) * spreadX * 1.8;
          linePosArray[idx + 3] = linePosArray[idx];
          linePosArray[idx + 1] = (Math.random() - 0.5) * spreadY * 1.8;
          linePosArray[idx + 4] = linePosArray[idx + 1];
        }
      }
      linePosAttr.needsUpdate = true;

      // Subtle slow scene rotation
      particleSystem.rotation.y += delta * 0.02;
      energyLines.rotation.y += delta * 0.015;

      // Render
      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate(performance.now());

    // ----------------------------------------------------
    // Complete Cleanup & Resource Disposal
    // ----------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      particleGeo.dispose();
      particleMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();

      if (composer) {
        composer.dispose();
      }
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="three-particle-canvas"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
