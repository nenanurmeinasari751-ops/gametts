const toWord = (value) => String(value).toUpperCase().replace(/[^A-Z]/g, '')

const directionOffset = {
  across: { row: 0, col: 1 },
  down: { row: 1, col: 0 },
}

const getBounds = (placements) => {
  const cells = placements.flatMap((placement) =>
    Array.from({ length: placement.answer.length }, (_, index) => ({
      row: placement.row + directionOffset[placement.direction].row * index,
      col: placement.col + directionOffset[placement.direction].col * index,
    })),
  )

  return {
    minRow: Math.min(...cells.map((cell) => cell.row)),
    maxRow: Math.max(...cells.map((cell) => cell.row)),
    minCol: Math.min(...cells.map((cell) => cell.col)),
    maxCol: Math.max(...cells.map((cell) => cell.col)),
  }
}

const getCellMap = (placements) => {
  const cells = new Map()
  placements.forEach((placement) => {
    const offset = directionOffset[placement.direction]
    for (let index = 0; index < placement.answer.length; index += 1) {
      const row = placement.row + offset.row * index
      const col = placement.col + offset.col * index
      const key = `${row},${col}`
      const cell = cells.get(key) || { letter: placement.answer[index], directions: new Set() }
      cell.directions.add(placement.direction)
      cells.set(key, cell)
    }
  })
  return cells
}

const getPlacementCandidates = (word, placements) => {
  const cells = getCellMap(placements)
  const candidates = new Map()

  placements.forEach((placed) => {
    if (placed.direction === 'across') {
      for (let placedIndex = 0; placedIndex < placed.answer.length; placedIndex += 1) {
        for (let wordIndex = 0; wordIndex < word.answer.length; wordIndex += 1) {
          if (placed.answer[placedIndex] !== word.answer[wordIndex]) continue
          candidates.set(`down:${placed.row - wordIndex},${placed.col + placedIndex}`, {
            direction: 'down',
            row: placed.row - wordIndex,
            col: placed.col + placedIndex,
          })
        }
      }
    } else {
      for (let placedIndex = 0; placedIndex < placed.answer.length; placedIndex += 1) {
        for (let wordIndex = 0; wordIndex < word.answer.length; wordIndex += 1) {
          if (placed.answer[placedIndex] !== word.answer[wordIndex]) continue
          candidates.set(`across:${placed.row + placedIndex},${placed.col - wordIndex}`, {
            direction: 'across',
            row: placed.row + placedIndex,
            col: placed.col - wordIndex,
          })
        }
      }
    }
  })

  return [...candidates.values()].flatMap((candidate) => {
    const offset = directionOffset[candidate.direction]
    const perpendicular = candidate.direction === 'across'
      ? [{ row: -1, col: 0 }, { row: 1, col: 0 }]
      : [{ row: 0, col: -1 }, { row: 0, col: 1 }]
    const intersections = []
    let isValid = true

    for (let index = 0; index < word.answer.length; index += 1) {
      const row = candidate.row + offset.row * index
      const col = candidate.col + offset.col * index
      const key = `${row},${col}`
      const occupied = cells.get(key)

      if (occupied) {
        if (occupied.letter !== word.answer[index] || occupied.directions.has(candidate.direction)) {
          isValid = false
          break
        }
        intersections.push(key)
      }

      for (const neighbor of perpendicular) {
        const neighborKey = `${row + neighbor.row},${col + neighbor.col}`
        if (cells.has(neighborKey) && !occupied) {
          isValid = false
          break
        }
      }
      if (!isValid) break
    }

    const before = `${candidate.row - offset.row},${candidate.col - offset.col}`
    const after = `${candidate.row + offset.row * word.answer.length},${candidate.col + offset.col * word.answer.length}`
    if (!isValid || intersections.length === 0 || cells.has(before) || cells.has(after)) return []

    const placement = { ...word, ...candidate }
    const bounds = getBounds([...placements, placement])
    const area = (bounds.maxRow - bounds.minRow + 1) * (bounds.maxCol - bounds.minCol + 1)
    return [{ ...placement, score: area - intersections.length * 4 }]
  }).sort((a, b) => a.score - b.score)
}

const findPlacements = (words) => {
  const first = words[0]
  let best = [{ ...first, row: 0, col: 0, direction: 'across' }]
  let visited = 0

  const search = (placements, remaining) => {
    visited += 1
    if (placements.length > best.length) best = placements
    if (remaining.length === 0 || visited > 12000) return

    const choices = remaining
      .map((word) => ({ word, candidates: getPlacementCandidates(word, placements) }))
      .filter((choice) => choice.candidates.length > 0)
      .sort((a, b) => a.candidates.length - b.candidates.length)

    if (!choices.length) return
    const [choice] = choices
    const nextRemaining = remaining.filter((word) => word.id !== choice.word.id)
    choice.candidates.slice(0, 8).forEach((candidate) => {
      search([...placements, candidate], nextRemaining)
    })
  }

  search(best, words.slice(1))
  return best
}

export const generateCrossword = (wordEntries = []) => {
  const words = wordEntries
    .map((entry) => ({ ...entry, answer: toWord(entry.word) }))
    .filter((entry) => entry.answer.length > 1)
    .sort((a, b) => b.answer.length - a.answer.length)

  if (!words.length) {
    return { rows: 0, cols: 0, board: [], entries: [], cells: [], status: 'empty' }
  }

  const placements = findPlacements(words)
  const remaining = words.filter((word) => !placements.some((placement) => placement.id === word.id))

  remaining.forEach((word, index) => {
    const bounds = getBounds(placements)
    placements.push({
      ...word,
      row: bounds.maxRow + 2 + index,
      col: bounds.minCol,
      direction: 'across',
    })
  })

  const bounds = getBounds(placements)
  const rows = bounds.maxRow - bounds.minRow + 1
  const cols = bounds.maxCol - bounds.minCol + 1
  const board = Array.from({ length: rows }, () => Array(cols).fill(''))
  const entries = placements.map((placement) => ({
    id: placement.id,
    word: placement.word,
    answer: placement.answer,
    clueEn: placement.clueEn,
    clueId: placement.clueId,
    category: placement.category,
    difficulty: placement.difficulty,
    direction: placement.direction,
    startRow: placement.row - bounds.minRow,
    startCol: placement.col - bounds.minCol,
    length: placement.answer.length,
  }))

  entries.forEach((entry) => {
    const offset = directionOffset[entry.direction]
    for (let index = 0; index < entry.length; index += 1) {
      board[entry.startRow + offset.row * index][entry.startCol + offset.col * index] = entry.answer[index]
    }
  })

  const startNumbers = new Map()
  entries
    .slice()
    .sort((a, b) => a.startRow - b.startRow || a.startCol - b.startCol)
    .forEach((entry) => {
      const key = `${entry.startRow},${entry.startCol}`
      if (!startNumbers.has(key)) startNumbers.set(key, startNumbers.size + 1)
      entry.number = startNumbers.get(key)
    })

  entries.sort((a, b) => a.number - b.number || (a.direction === 'across' ? -1 : 1))

  return { rows, cols, board, entries, cells: [], status: 'ready' }
}

export const createPuzzleData = (words = []) => {
  const result = generateCrossword(words)
  if (!result.entries.length) {
    return {
      status: 'failed',
      message: 'The selected words could not form a valid crossword. Please choose another combination.',
      entries: [],
      board: [],
      rows: 0,
      cols: 0,
    }
  }

  return result
}

export const isCellBlack = (board, row, col) => !board[row]?.[col]
