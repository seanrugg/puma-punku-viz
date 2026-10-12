import * as THREE from 'three'

const SANDSTONE = '#c66d1e'
const SELECTED  = '#e8a040'

export default function Slab({ position, rotation, scale, onSelect, selected }) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
      onClick={(e) => { e.stopPropagation(); onSelect?.() }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={selected ? SELECTED : SANDSTONE}
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  )
}
