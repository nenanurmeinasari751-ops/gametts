import { Check, Volume2 } from 'lucide-react'

const VocabularyCard = ({ item, learned, onToggleLearned, showTranslation }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
    <div className="flex items-start justify-between gap-3">
      <div>
        <div className="text-2xl font-bold text-slate-800">{item.word}</div>
        <div className="text-xs uppercase tracking-wide text-sky-700">{item.category}</div>
      </div>
      <button type="button" onClick={() => onToggleLearned(item.id, !learned)} className={`rounded-full p-2 ${learned ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
        {learned ? <Check className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>

    <div className="mt-4 space-y-2 text-sm text-slate-700">
      <p><span className="font-semibold">Pronunciation:</span> {item.pronunciation}</p>
      <p><span className="font-semibold">Meaning in English:</span> {item.meaningEn}</p>
      {showTranslation && <p><span className="font-semibold">Arti Indonesia:</span> {item.meaningId}</p>}
      <p><span className="font-semibold">Example:</span> {item.exampleEn}</p>
      {showTranslation && <p><span className="font-semibold">Terjemahan:</span> {item.exampleId}</p>}
    </div>
  </div>
)

export default VocabularyCard
