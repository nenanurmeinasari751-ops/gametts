const ResultModal = ({ title, message, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
      <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
      <p className="mt-3 text-slate-600">{message}</p>
      <button type="button" onClick={onClose} className="mt-6 rounded-full bg-navy px-4 py-2 text-white shadow-lg shadow-sky-200 transition hover:bg-sky-700">Close</button>
    </div>
  </div>
)

export default ResultModal
