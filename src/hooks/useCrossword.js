import { useEffect, useMemo, useState } from 'react'
import { vocabularyById } from '../data/vocabulary'
import { createPuzzleData } from '../utils/crosswordGenerator'
import { calculateAccuracy, calculateWordScore } from '../utils/scoring'

const normalize = (value = '') => String(value).toUpperCase().replace(/\s+/g, '')

export const useCrossword = ({ puzzleWords = [] }) => {
  const selectedWords = useMemo(() => puzzleWords.map((id) => vocabularyById[id]).filter(Boolean), [puzzleWords])

  const puzzle = useMemo(() => createPuzzleData(selectedWords), [selectedWords])

  const [answers, setAnswers] = useState({})
  const [selectedEntryId, setSelectedEntryId] = useState(null)
  const [revealedLetters, setRevealedLetters] = useState({})
  const [checked, setChecked] = useState(false)
  const [status, setStatus] = useState('playing')

  useEffect(() => {
    if (!puzzle.entries.length) return
    const base = {}
    puzzle.entries.forEach((entry) => {
      base[entry.id] = ''
    })
    setAnswers(base)
    setSelectedEntryId(puzzle.entries[0]?.id ?? null)
    setRevealedLetters({})
    setChecked(false)
    setStatus('playing')
  }, [puzzle.entries])

  const updateAnswer = (entryId, nextValue) => {
    setAnswers((previous) => ({
      ...previous,
      [entryId]: normalize(nextValue),
    }))
  }

  const getEntry = (entryId) => puzzle.entries.find((entry) => entry.id === entryId)

  const selectedEntry = getEntry(selectedEntryId) || puzzle.entries[0]

  const revealLetter = () => {
    if (!selectedEntry) return

    const revealKey = `${selectedEntry.id}`
    const current = answers[selectedEntry.id] || ''
    const answer = selectedEntry.answer
    let index = -1

    for (let i = 0; i < answer.length; i += 1) {
      if ((current[i] ?? '') === '') {
        index = i
        break
      }
    }

    if (index < 0 || index >= answer.length) return

    const updated = current.split('')
    updated[index] = answer[index]
    setAnswers((previous) => ({ ...previous, [selectedEntry.id]: updated.join('') }))
    setRevealedLetters((previous) => ({ ...previous, [revealKey]: (previous[revealKey] || 0) + 1 }))
  }

  const clearWord = () => {
    if (!selectedEntry) return
    setAnswers((previous) => ({ ...previous, [selectedEntry.id]: '' }))
  }

  const checkAnswers = () => {
    setChecked(true)
    const solved = puzzle.entries.reduce((count, entry) => {
      const value = normalize(answers[entry.id] || '')
      return count + (normalize(entry.answer) === value ? 1 : 0)
    }, 0)

    setStatus(solved === puzzle.entries.length ? 'completed' : 'playing')
  }

  const totalWords = puzzle.entries.length || 1
  const correctWords = puzzle.entries.reduce((count, entry) => {
    const value = normalize(answers[entry.id] || '')
    return count + (normalize(entry.answer) === value ? 1 : 0)
  }, 0)

  const accuracy = calculateAccuracy(correctWords, totalWords)

  const score = puzzle.entries.reduce((total, entry) => {
    const value = normalize(answers[entry.id] || '')
    const usedHint = (revealedLetters[entry.id] || 0) > 0
    if (normalize(entry.answer) === value) {
      return total + calculateWordScore(true, usedHint)
    }
    return total
  }, 0)

  const progress = puzzle.entries.length ? Math.round((correctWords / totalWords) * 100) : 0

  const resetGame = () => {
    const base = {}
    puzzle.entries.forEach((entry) => {
      base[entry.id] = ''
    })
    setAnswers(base)
    setChecked(false)
    setRevealedLetters({})
    setStatus('playing')
  }

  return {
    puzzle,
    answers,
    selectedEntry,
    setSelectedEntryId,
    selectedEntryId,
    updateAnswer,
    revealLetter,
    clearWord,
    checkAnswers,
    resetGame,
    checked,
    score,
    accuracy,
    correctWords,
    progress,
    totalWords,
    status,
    revealedLetters,
  }
}
