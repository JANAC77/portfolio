import { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ----------------------------------------------------
// INDIVIDUAL MERN PROCEDURAL LOGO GEOMETRIES
// ----------------------------------------------------

// 1. React Logo Component (Nucleus + 3 Orbiting Rings)
function ReactIcon({ hovered }) {
  const ringsRef = useRef();

  useFrame((state, delta) => {
    if (ringsRef.current) {
      const speed = hovered ? 1.8 : 0.6;
      ringsRef.current.rotation.z += delta * speed;
    }
  });

  return (
    <group>
      {/* Central Nucleus */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* Orbiting Rings */}
      <group ref={ringsRef}>
        {/* Ring 1 - Horizontal */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42, 0.015, 8, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
        </mesh>
        {/* Ring 2 - Rotated 60 deg */}
        <mesh rotation={[Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[0.42, 0.015, 8, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
        </mesh>
        {/* Ring 3 - Rotated -60 deg */}
        <mesh rotation={[-Math.PI / 6, Math.PI / 3, 0]}>
          <torusGeometry args={[0.42, 0.015, 8, 48]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// 2. Node.js Logo Component (Hexagonal Cylinder Shell + Hex Core)
function NodeIcon({ hovered }) {
  const outerRef = useRef();

  useFrame((state, delta) => {
    if (outerRef.current) {
      const speed = hovered ? 2.0 : 0.8;
      outerRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {/* Outer Hexagonal Prism Shell */}
      <mesh ref={outerRef} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.15, 6, 1, true]} />
        <meshBasicMaterial color="#39ff14" wireframe />
      </mesh>
      
      {/* Inner Green Core */}
      <mesh>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.55} />
      </mesh>
    </group>
  );
}

// 3. MongoDB Logo Component (Procedural Leaf + Center Vein)
function MongoIcon({ hovered }) {
  const leafShape = useMemo(() => {
    const s = new THREE.Shape();
    // Bottom tip -> right curve -> top tip -> left curve -> bottom tip
    s.moveTo(0, -0.45);
    s.quadraticCurveTo(0.3, -0.1, 0.3, 0.15);
    s.quadraticCurveTo(0.3, 0.4, 0, 0.6);
    s.quadraticCurveTo(-0.3, 0.4, -0.3, 0.15);
    s.quadraticCurveTo(-0.3, -0.1, 0, -0.45);
    return s;
  }, []);

  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      const speed = hovered ? 2.5 : 1.0;
      meshRef.current.rotation.y += delta * speed;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Filled Translucent Leaf Backplane */}
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshBasicMaterial color="#39ff14" transparent opacity={0.16} side={THREE.DoubleSide} />
      </mesh>

      {/* Glowing Leaf Wireframe Border */}
      <mesh>
        <shapeGeometry args={[leafShape]} />
        <meshBasicMaterial color="#39ff14" wireframe side={THREE.DoubleSide} />
      </mesh>

      {/* Central Vein Bar */}
      <mesh position={[0, 0.07, 0.01]}>
        <boxGeometry args={[0.02, 0.9, 0.015]} />
        <meshBasicMaterial color="#39ff14" />
      </mesh>
    </group>
  );
}

// 4. Express.js Logo Component (Procedural "E" & "X" wireframe elements)
function ExpressIcon({ hovered }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      const speed = hovered ? 2.2 : 0.7;
      groupRef.current.rotation.x += delta * speed * 0.3;
      groupRef.current.rotation.y += delta * speed * 0.7;
    }
  });

  return (
    <group ref={groupRef} scale={0.95}>
      {/* Stylized 'E' block (White) */}
      <group position={[-0.2, 0, 0]}>
        {/* Spine */}
        <mesh position={[-0.1, 0, 0]}>
          <boxGeometry args={[0.05, 0.5, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Top prong */}
        <mesh position={[0, 0.22, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Middle prong */}
        <mesh position={[-0.02, 0, 0]}>
          <boxGeometry args={[0.15, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        {/* Bottom prong */}
        <mesh position={[0, -0.22, 0]}>
          <boxGeometry args={[0.2, 0.05, 0.05]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Stylized 'X' crossing (Indigo-Purple) */}
      <group position={[0.18, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.55, 0.05]} />
          <meshBasicMaterial color="#818cf8" />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.05, 0.55, 0.05]} />
          <meshBasicMaterial color="#818cf8" />
        </mesh>
      </group>
    </group>
  );
}

// ----------------------------------------------------
// FLOATING NODE CONTAINER
// ----------------------------------------------------
function MernNode({ type, initialPos, velocity, index, onUpdatePosition }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Keep tracks of positions and speeds in refs to prevent triggering React state updates in high-frequency useFrame loops
  const pos = useMemo(() => new THREE.Vector3(...initialPos), [initialPos]);
  const vel = useRef(new THREE.Vector3(...velocity));

  // Drift boundaries
  const bounds = { x: 7.5, y: 5.2, z: 3.0 };

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    // 1. Basic Physics Drift
    pos.x += vel.current.x * delta;
    pos.y += vel.current.y * delta;
    pos.z += vel.current.z * delta;

    // 2. Bobbing floating effect
    const bobFreq = 1.2 + (index * 0.1);
    const bobAmp = 0.0015;
    pos.y += Math.sin(state.clock.elapsedTime * bobFreq) * bobAmp;

    // 3. Wall Bouncing Physics (perfect continuation of connector lines)
    if (pos.x > bounds.x) { pos.x = bounds.x; vel.current.x *= -1; }
    if (pos.x < -bounds.x) { pos.x = -bounds.x; vel.current.x *= -1; }
    if (pos.y > bounds.y) { pos.y = bounds.y; vel.current.y *= -1; }
    if (pos.y < -bounds.y) { pos.y = -bounds.y; vel.current.y *= -1; }
    if (pos.z > bounds.z) { pos.z = bounds.z; vel.current.z *= -1; }
    if (pos.z < -bounds.z) { pos.z = -bounds.z; vel.current.z *= -1; }

    // 4. Mouse Interactive Parallax Repulsion
    // Maps state.pointer (-1 to 1) to rough 3D coordinate space at target depth
    const mouse3D = new THREE.Vector3(state.pointer.x * 6.5, state.pointer.y * 4.5, pos.z);
    const distToMouse = pos.distanceTo(mouse3D);
    
    if (distToMouse < 2.2) {
      const forceStrength = (2.2 - distToMouse) * 0.06;
      const pushDirection = new THREE.Vector3().subVectors(pos, mouse3D).normalize();
      
      // Add push force to position
      pos.add(pushDirection.multiplyScalar(forceStrength));
      
      // Add minor acceleration away
      vel.current.add(pushDirection.multiplyScalar(forceStrength * 0.05));
      // Cap speed so it doesn't accelerate infinitely
      vel.current.clampLength(0.1, 0.9);
    }

    // Apply computed position to mesh
    meshRef.current.position.copy(pos);

    // 5. Update scale and general rotations
    const targetScale = hovered ? 1.35 : 1.0;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);

    // Constant slow orientation rotations
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.05;

    // 6. Callback up to parent to update positions for drawing network connections
    onUpdatePosition(index, pos.clone());
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        setHovered(false);
      }}
    >
      {type === 'react' && <ReactIcon hovered={hovered} />}
      {type === 'node' && <NodeIcon hovered={hovered} />}
      {type === 'mongo' && <MongoIcon hovered={hovered} />}
      {type === 'express' && <ExpressIcon hovered={hovered} />}

      {/* Subtle background glow sprite when hovered */}
      {hovered && (
        <mesh scale={[1.4, 1.4, 1.4]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial
            color={
              type === 'react' ? '#00f0ff' :
              type === 'node' ? '#39ff14' :
              type === 'mongo' ? '#39ff14' : '#818cf8'
            }
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}

// ----------------------------------------------------
// MAIN CONTAINER & NETWORK CONNECTIONS
// ----------------------------------------------------
export default function MernBackgroundNodes() {
  // Predefined initial configurations for 8 background nodes
  const nodeConfig = useMemo(() => [
    { type: 'react',   initialPos: [-3.2,  2.0, -1.0], velocity: [ 0.05, -0.04,  0.03] },
    { type: 'react',   initialPos: [ 3.0, -2.5,  0.5], velocity: [-0.03,  0.06, -0.02] },
    { type: 'node',    initialPos: [-4.0, -1.8,  0.0], velocity: [ 0.04,  0.05, -0.04] },
    { type: 'node',    initialPos: [ 2.0,  3.2, -1.5], velocity: [-0.05, -0.03,  0.05] },
    { type: 'mongo',   initialPos: [ 4.5,  1.5,  0.2], velocity: [-0.04, -0.04, -0.03] },
    { type: 'mongo',   initialPos: [-2.0, -3.2, -0.8], velocity: [ 0.06,  0.03,  0.04] },
    { type: 'express', initialPos: [-1.2,  3.5,  0.8], velocity: [ 0.03, -0.06, -0.05] },
    { type: 'express', initialPos: [ 1.0, -1.2, -1.2], velocity: [-0.04,  0.04,  0.03] }
  ], []);

  const nodesCount = nodeConfig.length;
  const lineRef = useRef();

  // Create standard ref arrays to store vector positions of all active nodes
  const activePositions = useRef(Array(nodesCount).fill(null).map(() => new THREE.Vector3()));

  // High performance pre-allocated float32 array for lines.
  // Maximum possible lines = 8 * 7 / 2 = 28 lines = 56 vertices.
  const maxConnections = 28;
  const linePositions = useMemo(() => new Float32Array(maxConnections * 2 * 3), []);

  const handleUpdatePosition = (idx, vec) => {
    activePositions.current[idx] = vec;
  };

  useFrame(() => {
    if (!lineRef.current) return;

    let vertexCount = 0;
    const positions = activePositions.current;

    // Compute pairwise connections between nodes that are close to each other
    for (let i = 0; i < nodesCount; i++) {
      for (let j = i + 1; j < nodesCount; j++) {
        const pA = positions[i];
        const pB = positions[j];

        if (pA && pB) {
          const distance = pA.distanceTo(pB);

          // If close enough, draw a glowing network coordinate segment between them
          if (distance < 4.2 && vertexCount < maxConnections * 2) {
            const idx1 = vertexCount * 3;
            linePositions[idx1] = pA.x;
            linePositions[idx1 + 1] = pA.y;
            linePositions[idx1 + 2] = pA.z;

            const idx2 = (vertexCount + 1) * 3;
            linePositions[idx2] = pB.x;
            linePositions[idx2 + 1] = pB.y;
            linePositions[idx2 + 2] = pB.z;

            vertexCount += 2;
          }
        }
      }
    }

    // Push the updated lines to the GPU
    lineRef.current.geometry.attributes.position.needsUpdate = true;
    lineRef.current.geometry.setDrawRange(0, vertexCount);
  });

  return (
    <group>
      {/* Node Instances */}
      {nodeConfig.map((config, index) => (
        <MernNode
          key={index}
          index={index}
          type={config.type}
          initialPos={config.initialPos}
          velocity={config.velocity}
          onUpdatePosition={handleUpdatePosition}
        />
      ))}

      {/* Network Connecting Lines */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.16}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
