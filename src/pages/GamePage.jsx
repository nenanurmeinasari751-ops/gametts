import { AlertCircle, CheckCircle2, PencilLine, RotateCcw, Sparkles, Wand2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CluePanel from '../components/CluePanel'
import CrosswordGrid from '../components/CrosswordGrid'
import ProgressBar from '../components/ProgressBar'
import ScoreBoard from '../components/ScoreBoard'
import { puzzleOptions } from '../data/puzzles'
import { saveGameProgress, clearGameProgress, saveGameSession } from '../db/database'
import { useCrossword } from '../hooks/useCrossword'
import { calculateAccuracy, getPerformanceMessage } from '../utils/scoring'

const GamePage = ({ settings = {} }) => {
  const navigate = useNavigate()
  const safeSettings = settings || {}
  const [selectedPuzzleId, setSelectedPuzzleId] = useState(puzzleOptions[0].id)
  const [playerName, setPlayerName] = useState(safeSettings.playerName || 'Student')
  const [showTranslation, setShowTranslation] = useState(safeSettings.showTranslation ?? true)
  const [timer, setTimer] = useState(0)
  const startTimeRef = useRef(Date.now())
  const finishedRef = useRef(false)
  const progressSavedRef = useRef(false)

  const selectedPuzzle = useMemo(() => puzzleOptions.find((puzzle) => puzzle.id === selectedPuzzleId) || puzzleOptions[0], [selectedPuzzleId])
  const { puzzle, answers, selectedEntry, selectedEntryId, setSelectedEntryId, updateAnswer, revealLetter, clearWord, checkAnswers, resetGame, checked, score, correctWords, progress, totalWords, status, revealedLetters } = useCrossword({ puzzleWords: selectedPuzzle.wordIds })

  useEffect(() => {
    setPlayerName(safeSettings.playerName || 'Student')
    setShowTranslation(safeSettings.showTranslation ?? true)
  }, [safeSettings])

  useEffect(() => {
    if (!safeSettings.timerEnabled) return undefined
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [safeSettings.timerEnabled])

  useEffect(() => {
    if (!selectedPuzzle) return
    const payload = {
      sessionId: 'current-progress',
      puzzleId: selectedPuzzle.id,
      answers,
      solvedWords: correctWords,
      currentClue: selectedEntry?.id || null,
    }
    saveGameProgress(payload).catch(() => {})
    progressSavedRef.current = true
  }, [answers, correctWords, selectedEntry, selectedPuzzle])

  useEffect(() => {
    if (status === 'completed' && !finishedRef.current) {
      finishedRef.current = true
      const accuracy = calculateAccuracy(correctWords, totalWords)
      const performance = getPerformanceMessage(accuracy)
      const session = {
        id: crypto.randomUUID(),
        playerName,
        startedAt: new Date(startTimeRef.current).toISOString(),
        completedAt: new Date().toISOString(),
        score,
        accuracy,
        durationSeconds: timer,
        totalWords,
        correctWords,
        hintsUsed: Object.values(revealedLetters).reduce((sum, value) => sum + Number(value || 0), 0),
      }
      saveGameSession(session).catch(() => {})
      clearGameProgress('current-progress').catch(() => {})
      navigate('/results', { state: { ...session, performance, wordList: selectedPuzzle.wordIds } })
    }
  }, [correctWords, navigate, playerName, revealedLetters, score, selectedPuzzle, status, timer, totalWords])

  const acrossClues = puzzle.entries.filter((entry) => entry.direction === 'across')
  const downClues = puzzle.entries.filter((entry) => entry.direction === 'down')

  const handleCellChange = (entryId, row, col, value) => {
    const entry = puzzle.entries.find((item) => item.id === entryId)
    if (!entry) return

    const index = entry.direction === 'across' ? col - entry.startCol : row - entry.startRow
    const current = answers[entryId] ? answers[entryId].split('') : Array(entry.answer.length).fill('')
    current[index] = value
    updateAnswer(entryId, current.join(''))
  }

  const handleKeyDown = (event, row, col, entryId) => {
    if (!entryId) return
    const entry = puzzle.entries.find((item) => item.id === entryId)
    if (!entry) return

    const index = entry.direction === 'across' ? col - entry.startCol : row - entry.startRow
    if (event.key === 'Backspace') {
      event.preventDefault()
      const next = (answers[entryId] || '').split('')
      next[index] = ''
      updateAnswer(entryId, next.join(''))
      return
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === 'Tab') {
      event.preventDefault()
      const nextIndex = (index + 1) % entry.answer.length
      const nextCell = entry.direction === 'across' ? { row, col: entry.startCol + nextIndex } : { row: entry.startRow + nextIndex, col }
      const targetEntry = puzzle.entries.find((item) => item.direction === item.direction && item.startRow === nextCell.row && item.startCol === nextCell.col)
      if (targetEntry) setSelectedEntryId(targetEntry.id)
    }
  }

  const activeEntry = selectedEntry || acrossClues[0] || downClues[0]

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">{selectedPuzzle.title}</h1>
          <p className="text-slate-600">{selectedPuzzle.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {puzzleOptions.map((option) => (
            <button key={option.id} type="button" onClick={() => setSelectedPuzzleId(option.id)} className={`rounded-full px-3 py-2 text-sm font-semibold ${selectedPuzzleId === option.id ? 'bg-sky-600 text-white' : 'bg-white text-slate-700 shadow-soft'}`}>
              {option.title}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6 rounded-2xl bg-white p-4 shadow-soft">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-slate-600">
          <span>Player</span>
          <input value={playerName} onChange={(event) => setPlayerName(event.target.value)} className="rounded-full border border-slate-300 px-3 py-2 text-right outline-none focus:border-sky-500" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-slate-600">Selected clue: {activeEntry ? `${activeEntry.clueEn}` : 'None'}</div>
          <button type="button" onClick={() => setShowTranslation((value) => !value)} className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700">{showTranslation ? 'Hide translation' : 'Show translation'}</button>
        </div>
      </div>

      <ScoreBoard score={score} correctWords={correctWords} totalWords={totalWords} progress={progress} hintsUsed={Object.values(revealedLetters).reduce((sum, value) => sum + Number(value || 0), 0)} timer={timer} />
      <div className="mt-6"><ProgressBar value={progress} label="Progress" /></div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-4">
          <CrosswordGrid puzzle={puzzle} answers={answers} selectedEntryId={selectedEntryId} onSelectEntry={setSelectedEntryId} onChangeCell={handleCellChange} onKeyDown={handleKeyDown} checked={checked} showTranslation={showTranslation} />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={checkAnswers} className="rounded-full bg-emerald-600 px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-500">CHECK ANSWERS</button>
            <button type="button" onClick={revealLetter} className="rounded-full bg-amber-400 px-4 py-3 font-semibold text-slate-900 shadow-lg shadow-amber-200 transition hover:bg-amber-300"><Wand2 className="mr-2 inline h-4 w-4" />REVEAL LETTER</button>
            <button type="button" onClick={clearWord} className="rounded-full bg-slate-200 px-4 py-3 font-semibold text-slate-800 transition hover:bg-slate-300"><PencilLine className="mr-2 inline h-4 w-4" />CLEAR WORD</button>
            <button type="button" onClick={() => { resetGame(); setTimer(0); startTimeRef.current = Date.now() }} className="rounded-full bg-red-100 px-4 py-3 font-semibold text-red-700 transition hover:bg-red-200"><RotateCcw className="mr-2 inline h-4 w-4" />RESET GAME</button>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4 text-slate-700">
            <div className="flex items-center gap-2 font-semibold"><Sparkles className="h-4 w-4 text-sky-600" /> Quick Feedback</div>
            {checked && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{correctWords} of {totalWords} words are correct.</span>
              </div>
            )}
          </div>
        </div>

        <CluePanel acrossClues={acrossClues} downClues={downClues} selectedEntryId={selectedEntryId} onSelectEntry={setSelectedEntryId} showTranslation={showTranslation} />
      </div>
    </main>
  )
}

export default GamePage
