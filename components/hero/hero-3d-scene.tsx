"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Hero3DFallback } from "./hero-3d-fallback";

function RetroComputer() {
  const groupRef = useRef<THREE.Group>(null);
  const monitorRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (monitorRef.current) {
      // Subtle head-tracking / cursor follow
      const targetY = state.pointer.x * 0.45;
      const targetX = -state.pointer.y * 0.25;
      monitorRef.current.rotation.y = THREE.MathUtils.lerp(
        monitorRef.current.rotation.y,
        targetY,
        0.08
      );
      monitorRef.current.rotation.x = THREE.MathUtils.lerp(
        monitorRef.current.rotation.x,
        targetX,
        0.08
      );
    }

    if (groupRef.current) {
      // Gentle idle breathing
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Monitor Assembly with Cursor Tracking */}
      <group ref={monitorRef} position={[0, 0.6, 0]}>
        {/* CRT Housing */}
        <RoundedBox args={[2.2, 1.8, 1.4]} radius={0.12} smoothness={4} position={[0, 0, 0]}>
          <meshStandardMaterial color="#E8E2D5" roughness={0.4} metalness={0.1} />
        </RoundedBox>

        {/* Screen Bezel Inset */}
        <RoundedBox args={[1.9, 1.5, 0.1]} radius={0.08} smoothness={4} position={[0, 0, 0.7]}>
          <meshStandardMaterial color="#2B2824" roughness={0.7} />
        </RoundedBox>

        {/* Phosphor Glow Screen */}
        <mesh position={[0, 0, 0.76]}>
          <planeGeometry args={[1.7, 1.3]} />
          <meshBasicMaterial color="#1E3827" />
        </mesh>

        {/* Glowing Screen Text Lines */}
        <mesh position={[-0.3, 0.3, 0.77]}>
          <planeGeometry args={[0.9, 0.08]} />
          <meshBasicMaterial color="#55EB7C" />
        </mesh>
        <mesh position={[-0.1, 0.1, 0.77]}>
          <planeGeometry args={[1.2, 0.08]} />
          <meshBasicMaterial color="#55EB7C" />
        </mesh>
        <mesh position={[-0.2, -0.1, 0.77]}>
          <planeGeometry args={[0.7, 0.08]} />
          <meshBasicMaterial color="#D97757" />
        </mesh>
        <mesh position={[0.4, -0.1, 0.77]}>
          <planeGeometry args={[0.08, 0.08]} />
          <meshBasicMaterial color="#55EB7C" />
        </mesh>

        {/* Monitor Base Pedestal */}
        <RoundedBox args={[0.6, 0.25, 0.6]} radius={0.04} smoothness={4} position={[0, -1.0, 0]}>
          <meshStandardMaterial color="#D8D0C0" roughness={0.5} />
        </RoundedBox>
      </group>

      {/* Main Computer Base Station / Desk CPU */}
      <RoundedBox args={[2.6, 0.5, 2.2]} radius={0.06} smoothness={4} position={[0, -0.5, 0.1]}>
        <meshStandardMaterial color="#E2DCD0" roughness={0.4} />
      </RoundedBox>

      {/* Floppy Drive Slot */}
      <mesh position={[0.6, -0.45, 1.21]}>
        <planeGeometry args={[0.8, 0.06]} />
        <meshBasicMaterial color="#1F1E1D" />
      </mesh>
      {/* Floppy Drive LED */}
      <mesh position={[0.1, -0.45, 1.21]}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#27C93F" />
      </mesh>

      {/* Keyboard */}
      <group position={[0, -0.65, 1.7]} rotation={[-0.15, 0, 0]}>
        <RoundedBox args={[2.4, 0.18, 1.0]} radius={0.04} smoothness={4}>
          <meshStandardMaterial color="#E8E2D5" roughness={0.5} />
        </RoundedBox>
        {/* Keys grid representation */}
        <RoundedBox args={[2.2, 0.08, 0.8]} radius={0.02} smoothness={2} position={[0, 0.08, 0]}>
          <meshStandardMaterial color="#D4CCBA" roughness={0.6} />
        </RoundedBox>
      </group>

      {/* Floating Retro Floppy Disk Accessory */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8} position={[1.8, 1.0, 0.5]}>
        <RoundedBox args={[0.7, 0.7, 0.06]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#D97757" roughness={0.3} metalness={0.2} />
        </RoundedBox>
        {/* Shutter */}
        <mesh position={[0, 0.15, 0.035]}>
          <planeGeometry args={[0.4, 0.35]} />
          <meshStandardMaterial color="#Silver" roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>

      {/* Floating Pixel Gem Accessory */}
      <Float speed={3.0} rotationIntensity={0.8} floatIntensity={0.6} position={[-1.8, 0.8, -0.2]}>
        <mesh rotation={[0.4, 0.4, 0]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial color="#4D7C79" roughness={0.2} metalness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

function Loader() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 font-mono-code text-xs text-[var(--foreground-muted)]">
      <div className="w-32 bg-[var(--surface-muted)] border border-[var(--border)] h-2 rounded overflow-hidden mb-2">
        <div className="bg-[var(--accent)] h-full w-2/3 animate-pulse" />
      </div>
      <span>MOUNTING 3D SHADERS...</span>
    </div>
  );
}

export function Hero3DScene() {
  const [mounted, setMounted] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (!mounted) {
    return <Hero3DFallback />;
  }

  if (reducedMotion || !hasWebGL) {
    return <Hero3DFallback />;
  }

  return (
    <div className="w-full h-[380px] sm:h-[460px] relative select-none">
      <Suspense fallback={<Loader />}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 1.2, 4.6], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.85} color="#FAF8F5" />
          <directionalLight position={[4, 6, 5]} intensity={1.2} color="#FFFFFF" castShadow />
          <pointLight position={[-4, 2, -2]} intensity={0.6} color="#D97757" />
          <pointLight position={[0, 3, 2]} intensity={0.4} color="#55EB7C" />

          {/* 3D Scene */}
          <RetroComputer />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.45}
            scale={6}
            blur={2.4}
            far={4}
            color="#1A1917"
          />
        </Canvas>
      </Suspense>

      {/* Floating Retro Instruction Badge */}
      <div className="absolute bottom-2 right-4 pointer-events-none hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--surface)]/80 backdrop-blur border border-[var(--border)] text-[10px] font-mono-code text-[var(--foreground-muted)] shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
        <span>TRACKING CURSOR</span>
      </div>
    </div>
  );
}

export default Hero3DScene;
