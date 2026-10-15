import { CheckCircle2, Clock3, Trophy, Wand2 } from 'lucide-react'

const ScoreBoard = ({ score, correctWords, totalWords, progress, hintsUsed, timer }) => (
  <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-soft md:grid-cols-4">
    <div className="rounded-xl bg-sky-50 p-3">
      <div className="flex items-center gap-2 text-sky-700"><Trophy className="h-4 w-4" /> Score</div>
      <div className="mt-2 text-2xl font-bold text-slate-800">{score}</div>
    </div>
    <div className="rounded-xl bg-emerald-50 p-3">
      <div className="flex items-center gap-2 text-emerald-700"><CheckCircle2 className="h-4 w-4" /> Correct</div>
      <div className="mt-2 text-2xl font-bold text-slate-800">{correctWords}/{totalWords}</div>
    </div>
    <div className="rounded-xl bg-amber-50 p-3">
      <div className="flex items-center gap-2 text-amber-700"><Wand2 className="h-4 w-4" /> Hints</div>
      <div className="mt-2 text-2xl font-bold text-slate-800">{hintsUsed}</div>
    </div>
    <div className="rounded-xl bg-violet-50 p-3">
      <div className="flex items-center gap-2 text-violet-700"><Clock3 className="h-4 w-4" /> Progress</div>
      <div className="mt-2 text-2xl font-bold text-slate-800">{progress}%</div>
    </div>
  </div>
)

export default ScoreBoard
