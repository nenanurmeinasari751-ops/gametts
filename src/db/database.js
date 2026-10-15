import Dexie from 'dexie'

const db = new Dexie('EmoneyWordCrossDB')

db.version(1).stores({
  vocabulary: 'id, word, category, difficulty, learned',
  gameSessions: 'id, playerName, startedAt, completedAt, score, accuracy, durationSeconds, totalWords, correctWords, hintsUsed',
  gameProgress: 'id, sessionId, puzzleId, answers, solvedWords, currentClue, updatedAt',
  settings: 'id, playerName, soundEnabled, showTranslation, timerEnabled',
})

export const getDb = () => db

export const ensureVocabularySeed = async (vocabularyList) => {
  const count = await db.vocabulary.count()
  if (count > 0) return

  await db.transaction('rw', db.vocabulary, async () => {
    await db.vocabulary.bulkPut(vocabularyList)
  })
}

export const getVocabulary = async () => {
  const rows = await db.vocabulary.toArray()
  return rows
}

export const saveGameProgress = async ({ sessionId, puzzleId, answers, solvedWords, currentClue }) => {
  const row = {
    id: sessionId,
    sessionId,
    puzzleId,
    answers,
    solvedWords,
    currentClue,
    updatedAt: new Date().toISOString(),
  }

  await db.transaction('rw', db.gameProgress, async () => {
    await db.gameProgress.put(row)
  })
}

export const restoreProgress = async (sessionId) => {
  return db.gameProgress.get(sessionId)
}

export const saveGameSession = async (session) => {
  await db.transaction('rw', db.gameSessions, async () => {
    await db.gameSessions.put(session)
  })
}

export const getGameHistory = async () => {
  return db.gameSessions.orderBy('completedAt').reverse().toArray()
}

export const getHighScore = async () => {
  const sessions = await db.gameSessions.toArray()
  return sessions.reduce((best, item) => Math.max(best, Number(item.score) || 0), 0)
}

export const updateSettings = async (settings) => {
  await db.transaction('rw', db.settings, async () => {
    await db.settings.put({ id: 'user-settings', ...settings })
  })
}

export const getSettings = async () => {
  return db.settings.get('user-settings') || {
    id: 'user-settings',
    playerName: '',
    soundEnabled: true,
    showTranslation: true,
    timerEnabled: false,
  }
}

export const clearGameProgress = async (sessionId) => {
  await db.transaction('rw', db.gameProgress, async () => {
    await db.gameProgress.delete(sessionId)
  })
}

export const setVocabularyLearned = async (id, learned) => {
  await db.transaction('rw', db.vocabulary, async () => {
    const current = await db.vocabulary.get(id)
    if (current) {
      await db.vocabulary.put({ ...current, learned })
    }
  })
}

export default db
