const ANDESITE = '#2d3436'
const SELECTED = '#e8a040'

// West Gate natural dimensions (metres) — the Puma Punku megalithic portal
const PILLAR_W = 0.85
const PILLAR_H = 3.2
const PILLAR_D = 1.3
const LINTEL_W = 4.6
const LINTEL_H = 1.9
const LINTEL_D = 1.3
const PILLAR_X = (PILLAR_W / 2) + (LINTEL_W / 2) - (PILLAR_W / 2)
// Simplified: pillars at ±1.8, lintel centred above pillars
const PILLAR_OFFSET = 1.8

export default function Gate({ position, rotation, scale, onSelect, selected }) {
  const color = selected ? SELECTED : ANDESITE
  const click = (e) => { e.stopPropagation(); onSelect?.() }
  const mat = (
    <meshStandardMaterial color={color} roughness={0.68} metalness={0.15} />
  )

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Left pillar */}
      <mesh position={[-PILLAR_OFFSET, PILLAR_H / 2, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[PILLAR_W, PILLAR_H, PILLAR_D]} />
        {mat}
      </mesh>
      {/* Right pillar */}
      <mesh position={[PILLAR_OFFSET, PILLAR_H / 2, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[PILLAR_W, PILLAR_H, PILLAR_D]} />
        {mat}
      </mesh>
      {/* Lintel — heavy lintel beam spanning the top */}
      <mesh position={[0, PILLAR_H + LINTEL_H / 2, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[LINTEL_W, LINTEL_H, LINTEL_D]} />
        {mat}
      </mesh>
      {/* Frieze cap — decorative stepped edge at the very top */}
      <mesh position={[0, PILLAR_H + LINTEL_H + 0.12, 0]} castShadow receiveShadow onClick={click}>
        <boxGeometry args={[LINTEL_W + 0.5, 0.24, LINTEL_D + 0.15]} />
        {mat}
      </mesh>
    </group>
  )
}
