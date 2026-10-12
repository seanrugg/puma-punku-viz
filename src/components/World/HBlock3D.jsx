const ANDESITE = '#2d3436'
const SELECTED = '#e8a040'

// Natural H-block dimensions (metres) — scaled up/down by the JSON scale prop
const PILLAR_W = 0.32
const PILLAR_H = 2.4
const PILLAR_D = 0.75
const CROSS_W  = 1.0
const CROSS_H  = 0.32
const CROSS_D  = 0.75
const PILLAR_X = (CROSS_W + PILLAR_W) / 2   // offset from centre
const CROSS_Y  = PILLAR_H - CROSS_H / 2

export default function HBlock3D({ position, rotation, scale, onSelect, selected }) {
  const color = selected ? SELECTED : ANDESITE
  const mat = (
    <meshStandardMaterial color={color} roughness={0.72} metalness={0.12} />
  )

  const click = (e) => { e.stopPropagation(); onSelect?.() }

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left pillar */}
      <mesh position={[-PILLAR_X, PILLAR_H / 2, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[PILLAR_W, PILLAR_H, PILLAR_D]} />
        {mat}
      </mesh>
      {/* Right pillar */}
      <mesh position={[PILLAR_X, PILLAR_H / 2, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[PILLAR_W, PILLAR_H, PILLAR_D]} />
        {mat}
      </mesh>
      {/* Crossbar (lintel of the H) */}
      <mesh position={[0, CROSS_Y, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[CROSS_W, CROSS_H, CROSS_D]} />
        {mat}
      </mesh>
    </group>
  )
}
