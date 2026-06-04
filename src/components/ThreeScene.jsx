import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import BackgroundStars from './BackgroundStars';
import MernBackgroundNodes from './MernBackgroundNodes';

export default function ThreeScene() {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#030014']} />

        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#bd00ff" />
        <directionalLight position={[0, 5, 0]} intensity={0.5} />

        {/* Ambient Space Starfield */}
        <BackgroundStars />

        {/* MERN Stack Interactive Floating Nodes */}
        <MernBackgroundNodes />

        {/* Central Futuristic Digital Energy Core */}
        <CentralCore />

        {/* Camera controller (mouse parallax) */}
        <CameraController />
      </Canvas>
    </div>
  );
}

function CentralCore() {
  const meshRef = useRef();
  const outerRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.12;
      meshRef.current.rotation.y += delta * 0.18;
    }
    if (outerRef.current) {
      outerRef.current.rotation.y -= delta * 0.08;
      outerRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central futuristic knot */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 100, 16]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
      {/* Outer grid sphere */}
      <mesh ref={outerRef} scale={[2.4, 2.4, 2.4]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#bd00ff"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>
    </group>
  );
}

function CameraController() {
  useFrame((state, delta) => {
    const { x, y } = state.pointer; // Normalized coordinates (-1 to 1)

    // Calculate scroll progress (0 to 1)
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

    // Subtle parallax offset targets based on mouse position AND scroll progress
    // As the user scrolls, the camera pans slightly down and around the center
    const targetX = x * 1.2 + Math.sin(scrollPercent * Math.PI * 1.2) * 1.5;
    const targetY = y * 0.8 - scrollPercent * 3.0; 
    const targetZ = 8.0 - scrollPercent * 1.5;

    // Smoothly lerp camera position
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, delta * 2.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 2.5);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 2.5);

    // Make the camera look at the center, shifting slightly down as we scroll
    state.camera.lookAt(0, -scrollPercent * 1.5, 0);
  });

  return null;
}
