import { useMemo } from 'react'

const getEntryIndex = (entry, row, col) => (
  entry.direction === 'across'
    ? col - entry.startCol
    : row - entry.startRow
)

const CrosswordGrid = ({ puzzle, answers, selectedEntryId, onSelectEntry, onChangeCell, onKeyDown, checked }) => {
  const grid = useMemo(() => {
    if (!puzzle.entries.length) return []

    return Array.from({ length: puzzle.rows }, (_, row) =>
      Array.from({ length: puzzle.cols }, (_, col) => {
        const entries = puzzle.entries.filter((entry) => {
          if (entry.direction === 'across') {
            return row === entry.startRow && col >= entry.startCol && col < entry.startCol + entry.length
          }
          return col === entry.startCol && row >= entry.startRow && row < entry.startRow + entry.length
        })
        const isBlack = !puzzle.board?.[row]?.[col]
        const selectedEntry = entries.find((entry) => entry.id === selectedEntryId) || entries[0]
        const letter = entries
          .map((entry) => answers[entry.id]?.[getEntryIndex(entry, row, col)] || '')
          .find(Boolean) || ''
        const isCorrect = Boolean(letter && entries.every((entry) => (
          letter === entry.answer[getEntryIndex(entry, row, col)]
        )))
        const isWrong = Boolean(letter && checked && !isCorrect)
        const startEntry = entries.find((entry) => entry.startRow === row && entry.startCol === col)

        return {
          row,
          col,
          entries,
          entryId: selectedEntry?.id,
          isBlack,
          letter,
          number: startEntry?.number,
          isSelected: entries.some((entry) => entry.id === selectedEntryId),
          isCorrect,
          isWrong,
        }
      }),
    )
  }, [answers, checked, puzzle, selectedEntryId])

  if (!grid.length) {
    return <div className="rounded-2xl bg-white p-6 text-center text-slate-500 shadow-soft">No crossword is available for this word set.</div>
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-white p-4 shadow-soft sm:p-6">
      <div className="mx-auto w-max max-w-full overflow-x-auto">
        <div
          role="grid"
          aria-label="Crossword puzzle"
          className="grid gap-px border border-slate-900 bg-slate-900 p-px"
          style={{
            gridTemplateColumns: `repeat(${puzzle.cols}, var(--crossword-cell-size))`,
            '--crossword-cell-size': 'clamp(1.15rem, 4.1vw, 2.25rem)',
          }}
        >
          {grid.flat().map((cell) => (
            <div
              key={`${cell.row}-${cell.col}`}
              role="gridcell"
              className={`relative aspect-square ${cell.isBlack ? 'bg-slate-900' : 'bg-white'}`}
            >
              {!cell.isBlack && (
                <>
                  {cell.number && (
                    <span className="pointer-events-none absolute left-0.5 top-0 z-10 text-[0.5rem] font-bold leading-none text-slate-700 sm:left-1 sm:top-0.5 sm:text-[0.6rem]">
                      {cell.number}
                    </span>
                  )}
                  <input
                    aria-label={`Cell ${cell.row + 1}-${cell.col + 1}${cell.number ? `, number ${cell.number}` : ''}`}
                    value={cell.letter}
                    onFocus={() => cell.entryId && onSelectEntry(cell.entryId)}
                    onChange={(event) => {
                      const value = event.target.value.toUpperCase().replace(/[^A-Z]/g, '').slice(-1)
                      if (value) onChangeCell(cell.entries, cell.row, cell.col, value)
                    }}
                    onKeyDown={(event) => onKeyDown(event, cell.row, cell.col, cell.entryId)}
                    maxLength={1}
                    className={`absolute inset-0 h-full w-full rounded-none border-0 p-0 pt-1 text-center text-sm font-bold uppercase outline-none transition-colors focus:z-10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:pt-1.5 sm:text-xl ${
                      cell.isCorrect ? 'bg-emerald-100 text-emerald-800' :
                      cell.isWrong ? 'bg-red-100 text-red-700' :
                      cell.isSelected ? 'bg-sky-100 text-slate-900' : 'bg-white text-slate-900'
                    }`}
                  />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CrosswordGrid
