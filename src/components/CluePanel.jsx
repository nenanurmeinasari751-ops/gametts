import { BookOpenText, Languages } from 'lucide-react'

const CluePanel = ({ acrossClues, downClues, selectedEntryId, onSelectEntry, showTranslation }) => (
  <div className="space-y-4">
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
        <BookOpenText className="h-4 w-4 text-sky-600" />
        ACROSS
      </div>
      <div className="space-y-2">
        {acrossClues.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelectEntry(entry.id)}
            className={`w-full rounded-xl border p-3 text-left transition ${selectedEntryId === entry.id ? 'border-sky-500 bg-sky-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
          >
            <div className="text-xs font-bold text-slate-500">#{entry.number}</div>
            <div className="text-sm font-medium text-slate-800">{entry.clueEn}</div>
            {showTranslation && <div className="mt-1 text-xs text-slate-600">{entry.clueId}</div>}
          </button>
        ))}
      </div>
    </div>

    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <div className="mb-3 flex items-center gap-2 font-semibold text-slate-700">
        <Languages className="h-4 w-4 text-violet-600" />
        DOWN
      </div>
      <div className="space-y-2">
        {downClues.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSelectEntry(entry.id)}
            className={`w-full rounded-xl border p-3 text-left transition ${selectedEntryId === entry.id ? 'border-violet-500 bg-violet-50' : 'border-slate-200 bg-slate-50 hover:border-slate-300'}`}
          >
            <div className="text-xs font-bold text-slate-500">#{entry.number}</div>
            <div className="text-sm font-medium text-slate-800">{entry.clueEn}</div>
            {showTranslation && <div className="mt-1 text-xs text-slate-600">{entry.clueId}</div>}
          </button>
        ))}
      </div>
    </div>
  </div>
)

export default CluePanel
