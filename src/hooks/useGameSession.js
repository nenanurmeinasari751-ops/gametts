import { useEffect, useMemo, useState } from 'react'
import { getGameHistory, getHighScore, getSettings, saveGameSession, updateSettings } from '../db/database'

export const useGameSession = () => {
  const [history, setHistory] = useState([])
  const [highScore, setHighScore] = useState(0)
  const [settings, setSettings] = useState({
    playerName: '',
    soundEnabled: true,
    showTranslation: true,
    timerEnabled: false,
  })
  const [loading, setLoading] = useState(true)

  const refresh = async () => {
    const [sessions, bestScore, savedSettings] = await Promise.all([
      getGameHistory(),
      getHighScore(),
      getSettings(),
    ])

    setHistory(sessions)
    setHighScore(bestScore)
    setSettings(savedSettings)
    setLoading(false)
  }

  useEffect(() => {
    refresh().catch(() => setLoading(false))
  }, [])

  const saveSession = async (session) => {
    await saveGameSession(session)
    await refresh()
  }

  const saveSettings = async (nextSettings) => {
    const merged = { ...settings, ...nextSettings }
    setSettings(merged)
    await updateSettings(merged)
  }

  return useMemo(() => ({
    history,
    highScore,
    settings,
    loading,
    refresh,
    saveSession,
    saveSettings,
  }), [history, highScore, settings, loading])
}
