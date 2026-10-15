import { useEffect, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { vocabularyBank } from './data/vocabulary'
import { getVocabulary, setVocabularyLearned } from './db/database'
import { seedVocabulary } from './db/seedVocabulary'
import { useGameSession } from './hooks/useGameSession'
import GamePage from './pages/GamePage'
import HistoryPage from './pages/HistoryPage'
import HomePage from './pages/HomePage'
import LessonPage from './pages/LessonPage'
import ResultsPage from './pages/ResultsPage'
import VocabularyPage from './pages/VocabularyPage'

function App() {
  const [ready, setReady] = useState(false)
  const [vocabulary, setVocabulary] = useState(vocabularyBank)
  const { history, highScore, settings, loading } = useGameSession()

  useEffect(() => {
    const initialize = async () => {
      try {
        await seedVocabulary()
        const rows = await getVocabulary()
        setVocabulary(rows)
      } catch (error) {
        setVocabulary(vocabularyBank)
      } finally {
        setReady(true)
      }
    }
    initialize()
  }, [])

  if (!ready || loading) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-100 text-lg font-semibold text-slate-700">Loading E-Money Word Cross...</div>
  }

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-100 text-slate-700">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage highScore={highScore} completedGames={history.length} />} />
          <Route path="/game" element={<GamePage settings={settings} />} />
          <Route path="/vocabulary" element={<VocabularyPage vocabulary={vocabulary} onToggleLearned={async (id, learned) => {
            await setVocabularyLearned(id, learned)
            setVocabulary((previous) => previous.map((item) => item.id === id ? { ...item, learned } : item))
          }} />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/history" element={<HistoryPage history={history} />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
