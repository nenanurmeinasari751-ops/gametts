import { useMemo } from 'react'

const getCellNumber = (row, col, puzzle) => {
  const match = puzzle.entries.find((entry) => {
    if (entry.direction === 'across') {
      return row === entry.startRow && col >= entry.startCol && col < entry.startCol + entry.length
    }
    return col === entry.startCol && row >= entry.startRow && row < entry.startRow + entry.length
  })
  return match ? match.number : null
}

const CrosswordGrid = ({ puzzle, answers, selectedEntryId, onSelectEntry, onChangeCell, onKeyDown, checked, showTranslation }) => {
  const grid = useMemo(() => {
    if (!puzzle.entries.length) return []
    const size = Math.max(puzzle.rows, puzzle.cols)
    const rows = []
    for (let row = 0; row < size; row += 1) {
      const cells = []
      for (let col = 0; col < size; col += 1) {
        const letter = puzzle.board?.[row]?.[col] || ''
        const isBlack = !letter
        const entry = puzzle.entries.find((item) => {
          if (item.direction === 'across') {
            return row === item.startRow && col >= item.startCol && col < item.startCol + item.length
          }
          return col === item.startCol && row >= item.startRow && row < item.startRow + item.length
        })

        const cellNumber = getCellNumber(row, col, puzzle)
        const answer = entry ? answers[entry.id] || '' : ''
        const char = entry ? answer[col - (entry.direction === 'across' ? entry.startCol : entry.startCol)] ?? '' : ''
        const target = entry ? entry.answer[(entry.direction === 'across' ? col - entry.startCol : row - entry.startRow)] ?? '' : ''
        const isCorrect = entry && char && char.toUpperCase() === target.toUpperCase()
        const isWrong = entry && char && checked && char.toUpperCase() !== target.toUpperCase()

        cells.push({
          row,
          col,
          isBlack,
          letter: char,
          entryId: entry ? entry.id : null,
          cellNumber,
          isSelected: entry ? selectedEntryId === entry.id : false,
          isCorrect,
          isWrong,
        })
      }
      rows.push(cells)
    }
    return rows
  }, [answers, checked, puzzle, selectedEntryId])

  return (
    <div className="overflow-x-auto rounded-2xl bg-sky-50 p-4 shadow-soft">
      <div className="mx-auto inline-block rounded-2xl bg-white p-3 shadow-inner">
        <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.max(puzzle.rows, puzzle.cols)}, minmax(2.2rem, 2.6rem))` }}>
          {grid.flat().map((cell, index) => (
            <div key={`${cell.row}-${cell.col}-${index}`} className="relative">
              {cell.cellNumber && (
                <span className="absolute left-1 top-0 text-[8px] font-bold text-slate-500">{cell.cellNumber}</span>
              )}
              {cell.isBlack ? (
                <div className="h-10 w-10 rounded-md border border-slate-900 bg-slate-900/95" />
              ) : (
                <input
                  aria-label={`Cell ${cell.row + 1}-${cell.col + 1}`}
                  value={cell.letter}
                  onFocus={() => cell.entryId && onSelectEntry(cell.entryId)}
                  onChange={(event) => {
                    const value = event.target.value.toUpperCase().slice(-1)
                    if (!value) return
                    onChangeCell(cell.entryId, cell.row, cell.col, value)
                  }}
                  onKeyDown={(event) => onKeyDown(event, cell.row, cell.col, cell.entryId)}
                  className={`h-10 w-10 rounded-md border text-center text-lg font-bold uppercase outline-none transition ${
                    cell.isCorrect ? 'border-emerald-400 bg-emerald-100 text-emerald-800' :
                    cell.isWrong ? 'border-red-400 bg-red-100 text-red-700' :
                    cell.isSelected ? 'border-sky-400 bg-sky-50 text-slate-800' : 'border-slate-300 bg-white text-slate-800'
                  }`}
                  maxLength={1}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CrosswordGrid
