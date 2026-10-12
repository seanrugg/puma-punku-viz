import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { useMemo } from 'react'
import Slab from './Slab'
import HBlock3D from './HBlock3D'
import Gate from './Gate'
import { getTransform } from '../../lib/transforms'

function Ground() {
  // Andean plateau surface
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
      <circleGeometry args={[80, 64]} />
      <meshStandardMaterial color="#6b5d3c" roughness={1} metalness={0} />
    </mesh>
  )
}

function Stone({ block, mode, selectedId, onSelect }) {
  const t = useMemo(() => getTransform(block, mode), [block, mode])
  const isSelected = block.id === selectedId
  const common = {
    position: t.position,
    rotation: t.rotation,
    scale:    t.scale,
    onSelect: () => onSelect(block),
    selected: isSelected
  }

  switch (block.category) {
    case 'foundation':     return <Slab {...common} />
    case 'wall_assembly':  return <HBlock3D {...common} />
    case 'superstructure': return <Gate {...common} />
    default:               return null
  }
}

export default function SiteScene({ blocks, mode, selectedId, onSelect }) {
  return (
    <Canvas
      camera={{ position: [14, 10, 14], fov: 42, near: 0.1, far: 300 }}
      shadows
      style={{ width: '100%', height: '100%' }}
      dpr={[1, 2]}
    >
      {/* Atmospheric sky — warm Andean late-afternoon light */}
      <Sky
        sunPosition={[80, 25, 100]}
        turbidity={3}
        rayleigh={0.6}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />

      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[35, 45, 25]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005}
      />
      <hemisphereLight args={['#a8c8f0', '#6b5d3c', 0.3]} />

      {/* Site geometry */}
      <Ground />
      {blocks.map(block => (
        <Stone
          key={block.id}
          block={block}
          mode={mode}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}

      <OrbitControls
        target={[0, 2, 0]}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={4}
        maxDistance={60}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  )
}
