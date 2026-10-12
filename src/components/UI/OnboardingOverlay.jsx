export default function OnboardingOverlay({ visible, onClose }) {
  if (!visible) return null

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center">
      <div className="bg-black/70 backdrop-blur-lg rounded-3xl p-8 max-w-md mx-4 text-white">
        <p className="text-amber-400 font-mono text-xs mb-1">Tiwanaku · 16°31′S  68°09′W</p>
        <h1 className="text-3xl font-bold mb-1">Puma Punku</h1>
        <p className="text-white/45 text-sm mb-5">c. 400 – 900 CE · Bolivia</p>

        <div className="space-y-3 text-sm text-white/75 leading-relaxed">
          <p>
            An interactive digital reconstruction of one of the most precisely
            engineered megalithic sites in the pre-Columbian Americas.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/40 mb-1">Navigate</p>
              <p className="text-white/70">Drag to orbit · Scroll to zoom</p>
            </div>
            <div className="bg-white/5 rounded-lg p-3">
              <p className="text-white/40 mb-1">Inspect</p>
              <p className="text-white/70">Click any block for details</p>
            </div>
          </div>
          <p className="text-white/35 text-[11px]">
            Reconstruction model after Alan Vranich (Vranich 2.1).
            Geometry is procedural — no 3D scan assets required.
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3.5 bg-amber-600 hover:bg-amber-500 active:bg-amber-700 rounded-2xl font-semibold text-sm transition-colors"
        >
          Enter the Site
        </button>
      </div>
    </div>
  )
}
