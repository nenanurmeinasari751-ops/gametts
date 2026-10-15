import { BookOpen, BookText, Home, ListChecks, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

const menu = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/lesson', label: 'Lesson', icon: BookOpen },
  { to: '/vocabulary', label: 'Vocabulary', icon: BookText },
  { to: '/history', label: 'History', icon: ListChecks },
]

const Header = () => (
  <header className="border-b border-slate-200 bg-navy text-white shadow-soft">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link to="/" className="flex items-center gap-3 font-bold">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg">E-MONEY WORD CROSS</div>
          <div className="text-xs text-sky-100">Class XII SMA</div>
        </div>
      </Link>

      <nav className="hidden gap-3 md:flex">
        {menu.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-sky-50 transition hover:bg-white/10">
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  </header>
)

export default Header
