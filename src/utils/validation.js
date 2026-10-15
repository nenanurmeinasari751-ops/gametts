export const normalizeAnswer = (value = '') => String(value).toUpperCase().replace(/\s+/g, '')

export const isAnswerCorrect = (answer, target) => normalizeAnswer(answer) === normalizeAnswer(target)

export const getLetterAt = (entry, index) => {
  const answer = entry.answer ?? ''
  return answer[index] ?? ''
}
