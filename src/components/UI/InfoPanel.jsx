export default function InfoPanel({ block, onClose }) {
  if (!block) return null

  const { id, type, properties = {} } = block
  const typeLabel = type.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <div className="absolute bottom-4 left-4 z-30 max-w-xs w-full bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-white animate-in">
      <button
        onClick={onClose}
        className="absolute top-2.5 right-3 text-white/40 hover:text-white text-xl leading-none"
        aria-label="Close"
      >
        ×
      </button>

      <p className="text-amber-400 font-mono text-xs mb-1">{id}</p>
      <h3 className="font-semibold text-sm mb-3">{typeLabel}</h3>

      <div className="space-y-2 text-sm">
        {properties.material && (
          <div className="flex justify-between">
            <span className="text-white/45">Material</span>
            <span>{properties.material}</span>
          </div>
        )}
        {properties.weight_est && (
          <div className="flex justify-between">
            <span className="text-white/45">Est. weight</span>
            <span>{properties.weight_est}</span>
          </div>
        )}
        {properties.note && (
          <p className="text-white/60 text-xs leading-relaxed border-t border-white/10 pt-2.5 mt-1">
            {properties.note}
          </p>
        )}
      </div>
    </div>
  )
}
