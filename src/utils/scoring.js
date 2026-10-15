export const calculateAccuracy = (correctWords, totalWords) => {
  if (!totalWords) return 0
  return Math.round((correctWords / totalWords) * 100)
}

export const getPerformanceMessage = (accuracy) => {
  if (accuracy >= 90) return { title: 'Excellent!', text: 'You did an outstanding job. Your understanding of e-money vocabulary is excellent.' }
  if (accuracy >= 80) return { title: 'Very Good!', text: 'Great effort. Keep strengthening your vocabulary and reading confidence.' }
  if (accuracy >= 70) return { title: 'Good Job!', text: 'Nice progress. Review a few terms and you will improve even more.' }
  return { title: 'Keep Practicing!', text: 'You are making progress. Review the vocabulary bank and try again.' }
}

export const calculateWordScore = (wasCorrect, usedHint = false) => {
  if (!wasCorrect) return 0
  return usedHint ? 5 : 10
}

export const summarizeResult = ({ correctWords, totalWords, hintsUsed, score, accuracy }) => ({
  correctWords,
  totalWords,
  hintsUsed,
  score,
  accuracy,
})
