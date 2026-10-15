import { Link, useLocation } from 'react-router-dom'
import { getPerformanceMessage } from '../utils/scoring'
import { formatTime } from '../utils/formatTime'

const ResultsPage = () => {
  const { state } = useLocation()
  const result = state || {}
  const performance = result.performance || getPerformanceMessage(result.accuracy || 0)

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="rounded-3xl bg-white p-8 shadow-soft">
        <div className="mb-6 text-center">
          <div className="text-sm uppercase tracking-[0.2em] text-sky-700">Game Result</div>
          <h1 className="mt-2 text-4xl font-black text-slate-800">{performance.title}</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-sky-50 p-4"><div className="text-sm text-sky-700">Final Score</div><div className="mt-2 text-3xl font-black text-slate-800">{result.score || 0}</div></div>
          <div className="rounded-2xl bg-emerald-50 p-4"><div className="text-sm text-emerald-700">Accuracy</div><div className="mt-2 text-3xl font-black text-slate-800">{result.accuracy || 0}%</div></div>
          <div className="rounded-2xl bg-amber-50 p-4"><div className="text-sm text-amber-700">Time</div><div className="mt-2 text-3xl font-black text-slate-800">{formatTime(result.durationSeconds || 0)}</div></div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-800">Summary</h2>
            <ul className="mt-4 space-y-2 text-slate-600">
              <li>Player: {result.playerName || 'Student'}</li>
              <li>Correct words: {result.correctWords || 0} / {result.totalWords || 0}</li>
              <li>Hints used: {result.hintsUsed || 0}</li>
              <li>Completion time: {formatTime(result.durationSeconds || 0)}</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="text-xl font-bold text-slate-800">Motivation</h2>
            <p className="mt-4 text-slate-700">{performance.text}</p>
            <p className="mt-4 text-slate-500">In English: {performance.text} / In Indonesian: {performance.text}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/game" className="rounded-full bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-200 transition hover:bg-sky-500">PLAY AGAIN</Link>
          <Link to="/vocabulary" className="rounded-full bg-slate-200 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-300">REVIEW VOCABULARY</Link>
          <Link to="/history" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500">VIEW HISTORY</Link>
        </div>
      </div>
    </main>
  )
}

export default ResultsPage
