import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import VocabularyCard from '../components/VocabularyCard'

const categoryOptions = ['all', 'technology', 'finance', 'safety', 'benefit', 'drawback', 'text']

const VocabularyPage = ({ vocabulary, onToggleLearned }) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => vocabulary.filter((item) => {
    const matchesSearch = item.word.toLowerCase().includes(search.toLowerCase()) || item.meaningEn.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'all' || item.category === category
    return matchesSearch && matchesCategory
  }), [category, search, vocabulary])

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6 rounded-2xl bg-white p-5 shadow-soft">
        <h1 className="text-3xl font-black text-slate-800">Vocabulary Bank</h1>
        <p className="mt-2 text-slate-600">Explore the e-money terminology alongside its meaning, examples, and context.</p>

        <div className="mt-4 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search vocabulary" className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-9 pr-4 outline-none transition focus:border-sky-500" />
          </div>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-full border border-slate-300 bg-slate-50 px-4 py-2 outline-none focus:border-sky-500">
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option === 'all' ? 'All categories' : option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <VocabularyCard key={item.id} item={item} learned={item.learned} onToggleLearned={onToggleLearned} showTranslation />
        ))}
      </div>
    </main>
  )
}

export default VocabularyPage
