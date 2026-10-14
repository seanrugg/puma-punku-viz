// Deterministic seeded PRNG so the ruins layout is stable across renders
function seededRand(seed) {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619) | 0
  }
  return () => {
    h ^= h << 13
    h ^= h >>> 17
    h ^= h << 5
    h |= 0
    return (h >>> 0) / 4294967296
  }
}

/**
 * Returns the three.js-ready transform for a block, given the current mode.
 * Reconstructed: exact JSON position/rotation/scale.
 * Ruins: scattered, toppled positions derived deterministically from block ID.
 */
export function getTransform(block, mode) {
  const { position, rotation } = block
  // three.js/R3F needs [x, y, z] arrays; a plain {x,y,z} object becomes a NaN scale (invisible mesh)
  const scale = [block.scale.x, block.scale.y, block.scale.z]

  if (mode === 'reconstructed') {
    return {
      position: [position.x, position.y, position.z],
      rotation: [rotation.x, rotation.y, rotation.z],
      scale
    }
  }

  const r = seededRand(block.id)
  const scatterX = (r() - 0.5) * 5
  const scatterZ = (r() - 0.5) * 5
  const spinY = r() * Math.PI * 2

  switch (block.category) {
    case 'foundation':
      // Slabs slightly buried, minor tilt
      return {
        position: [position.x, -0.4, position.z],
        rotation: [0, (r() - 0.5) * 0.15, (r() - 0.5) * 0.08],
        scale
      }

    case 'wall_assembly':
      // H-blocks toppled on the ground, scattered
      return {
        position: [position.x + scatterX, 0.35, position.z + scatterZ],
        rotation: [Math.PI / 2 * (r() > 0.5 ? 1 : -1), spinY, 0],
        scale
      }

    case 'superstructure':
      // Gate tipped over, displaced to one side
      return {
        position: [position.x + scatterX * 0.4, 2.2, position.z + 3.5],
        rotation: [0, spinY * 0.2, Math.PI / 2 - 0.1],
        scale
      }

    default:
      return {
        position: [position.x, position.y, position.z],
        rotation: [rotation.x, rotation.y, rotation.z],
        scale
      }
  }
}
