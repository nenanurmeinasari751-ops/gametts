const ProgressBar = ({ value, label }) => (
  <div className="w-full">
    <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-600">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 transition-all duration-300" style={{ width: `${value}%` }} />
    </div>
  </div>
)

export default ProgressBar
