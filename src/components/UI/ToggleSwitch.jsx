export default function ToggleSwitch({ mode, onChange }) {
  const btn = (val) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
      mode === val
        ? 'bg-amber-600 text-white shadow-md'
        : 'text-white/45 hover:text-white/75'
    }`

  return (
    <div className="flex bg-black/60 backdrop-blur-md border border-white/10 rounded-full p-1 gap-0.5">
      <button onClick={() => onChange('ruins')} className={btn('ruins')}>
        Ruins
      </button>
      <button onClick={() => onChange('reconstructed')} className={btn('reconstructed')}>
        Reconstructed
      </button>
    </div>
  )
}
