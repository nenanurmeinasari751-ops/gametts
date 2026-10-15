import { ArrowRight, BookOpen, BrainCircuit, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'

const HomePage = ({ highScore, completedGames }) => (
  <main className="mx-auto max-w-6xl px-4 py-10">
    <section className="rounded-3xl bg-gradient-to-r from-navy to-sky-700 p-8 text-white shadow-soft">
      <div className="grid gap-6 md:grid-cols-[1.5fr_0.7fr] md:items-center">
        <div>
          <div className="mb-4 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-sky-100">Argumentative Text • E-Money</div>
          <h1 className="text-4xl font-black md:text-5xl">E-MONEY WORD CROSS</h1>
          <p className="mt-3 max-w-xl text-sky-100">Learn English Vocabulary Through Crossword Games!</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/game" className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-5 py-3 font-semibold text-slate-900 shadow-lg shadow-yellow-200/40 transition hover:bg-yellow-300">START GAME <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/vocabulary" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">VOCABULARY BANK</Link>
            <Link to="/lesson" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">HOW TO PLAY</Link>
          </div>
        </div>

        <div className="grid gap-4 rounded-3xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="flex items-center gap-2 text-sky-100"><Trophy className="h-4 w-4" /> Highest Score</div>
            <div className="mt-2 text-3xl font-black">{highScore}</div>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <div className="flex items-center gap-2 text-sky-100"><BrainCircuit className="h-4 w-4" /> Completed Games</div>
            <div className="mt-2 text-3xl font-black">{completedGames}</div>
          </div>
        </div>
      </div>
    </section>

    <section className="mt-8 grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700"><BookOpen className="h-5 w-5" /></div>
        <h2 className="text-xl font-bold text-slate-800">Vocabulary Focus</h2>
        <p className="mt-2 text-slate-600">Students learn digital finance vocabulary used in argumentative texts and daily language.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"><ArrowRight className="h-5 w-5" /></div>
        <h2 className="text-xl font-bold text-slate-800">Game with Clues</h2>
        <p className="mt-2 text-slate-600">Every clue is written in English with an Indonesian translation, helping students learn meaning and context.</p>
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><BrainCircuit className="h-5 w-5" /></div>
        <h2 className="text-xl font-bold text-slate-800">Argumentative Skills</h2>
        <p className="mt-2 text-slate-600">The lesson supports thesis, arguments, evidence, rebuttal, and conclusion in short learning passages.</p>
      </div>
    </section>
  </main>
)

export default HomePage
