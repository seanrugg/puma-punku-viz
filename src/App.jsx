import { useState, useEffect, useCallback } from 'react'
import SiteScene from './components/World/SiteScene'
import ToggleSwitch from './components/UI/ToggleSwitch'
import InfoPanel from './components/UI/InfoPanel'
import OnboardingOverlay from './components/UI/OnboardingOverlay'

export default function App() {
  const [blocks, setBlocks]       = useState(null)
  const [mode, setMode]           = useState('reconstructed')
  const [selected, setSelected]   = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(true)

  // Load site data once on mount
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + 'assets/data/vranich_matrix.json')
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then(json => setBlocks(json.blocks ?? []))
      .catch(err => {
        console.error('Failed to load site data:', err)
        setBlocks([])   // fall back to empty rather than crash
      })
  }, [])

  const handleSelect = useCallback((block) => {
    setSelected(prev => (prev?.id === block.id ? null : block))
  }, [])

  const loading = blocks === null

  return (
    <div className="relative w-full h-screen bg-gray-950 select-none">

      {/* 3D viewport — always rendered, blocks appear once loaded */}
      {blocks !== null && (
        <div className="absolute inset-0">
          <SiteScene
            blocks={blocks}
            mode={mode}
            selectedId={selected?.id}
            onSelect={handleSelect}
          />
        </div>
      )}

      {/* Header — site title + mode toggle */}
      <header className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 pointer-events-auto">
        <div className="min-w-0">
          <h1 className="text-white font-bold text-base leading-tight tracking-tight">
            Puma Punku
          </h1>
          <p className="text-white/35 text-[10px] font-mono">
            Tiwanaku, Bolivia · Vranich 2.1
          </p>
        </div>
        <ToggleSwitch mode={mode} onChange={setMode} />
      </header>

      {/* Block info card */}
      <InfoPanel block={selected} onClose={() => setSelected(null)} />

      {/* Onboarding */}
      <OnboardingOverlay visible={showOnboarding} onClose={() => setShowOnboarding(false)} />

      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-950">
          <div className="w-7 h-7 border-2 border-white/15 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-white/40 text-sm mt-4">Loading site…</p>
        </div>
      )}

    </div>
  )
}
