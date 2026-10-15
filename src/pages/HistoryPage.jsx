import { formatTime } from '../utils/formatTime'

const HistoryPage = ({ history }) => (
  <main className="mx-auto max-w-5xl px-4 py-10">
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <h1 className="text-3xl font-black text-slate-800">Learning History</h1>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full text-left">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Player</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Correct</th>
              <th className="px-4 py-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-slate-500">No completed games yet.</td>
              </tr>
            ) : (
              history.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 text-slate-600">{new Date(item.completedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-slate-700">{item.playerName || 'Player'}</td>
                  <td className="px-4 py-3 font-bold text-slate-800">{item.score}</td>
                  <td className="px-4 py-3 text-slate-700">{item.correctWords}/{item.totalWords}</td>
                  <td className="px-4 py-3 text-slate-700">{formatTime(item.durationSeconds)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </main>
)

export default HistoryPage
