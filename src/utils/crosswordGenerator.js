const toWord = (value) => String(value).toUpperCase().replace(/[^A-Z]/g, '')

const buildEmptyBoard = (size) => Array.from({ length: size }, () => Array(size).fill(''))

export const generateCrossword = (wordEntries = []) => {
  const words = wordEntries
    .map((entry) => ({ ...entry, normalized: toWord(entry.word) }))
    .filter((entry) => entry.normalized.length > 1)

  if (!words.length) {
    return { rows: 0, cols: 0, board: [], entries: [], cells: [], status: 'empty' }
  }

  const size = Math.max(12, words.length * 2 + 6, Math.max(...words.map((entry) => entry.normalized.length)) + 4)
  const board = buildEmptyBoard(size)
  const entries = []

  words.forEach((entry, index) => {
    const answer = entry.normalized
    const row = index * 2 + 1
    const col = 1

    for (let i = 0; i < answer.length; i += 1) {
      board[row][col + i] = answer[i]
    }

    entries.push({
      id: entry.id,
      word: entry.word,
      answer,
      clueEn: entry.clueEn,
      clueId: entry.clueId,
      category: entry.category,
      difficulty: entry.difficulty,
      number: entries.length + 1,
      direction: 'across',
      startRow: row,
      startCol: col,
      length: answer.length,
    })
  })

  words.forEach((entry, index) => {
    const answer = entry.normalized
    const row = 0
    const col = index * 2 + 2

    for (let i = 0; i < answer.length; i += 1) {
      if (row + i < size) {
        board[row + i][col] = answer[i]
      }
    }

    entries.push({
      id: `${entry.id}-down`,
      word: entry.word,
      answer,
      clueEn: entry.clueEn,
      clueId: entry.clueId,
      category: entry.category,
      difficulty: entry.difficulty,
      number: entries.length + 1,
      direction: 'down',
      startRow: row,
      startCol: col,
      length: answer.length,
    })
  })

  return {
    rows: size,
    cols: size,
    board,
    entries,
    cells: [],
    status: 'ready',
  }
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
