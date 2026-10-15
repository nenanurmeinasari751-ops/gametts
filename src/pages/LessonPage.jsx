import { CheckCircle2 } from 'lucide-react'

const LessonPage = () => (
  <main className="mx-auto max-w-5xl px-4 py-10">
    <div className="rounded-3xl bg-white p-6 shadow-soft">
      <h1 className="text-3xl font-black text-slate-800">Understanding Argumentative Text: E-Money</h1>
      <div className="mt-6 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-bold text-slate-800">Definition of argumentative text</h2>
          <p className="mt-2">An argumentative text presents a point of view and supports it with reasons, evidence, and logical explanations. The purpose is to persuade the reader to agree with the writer.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800">Social function</h2>
          <p className="mt-2">The social function of an argumentative text is to convince people to accept an opinion by presenting clear reasons and evidence.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800">Generic structure</h2>
          <ul className="mt-3 space-y-2">
            <li><span className="font-semibold text-slate-800">Thesis:</span> the writer states the main opinion.</li>
            <li><span className="font-semibold text-slate-800">Arguments:</span> reasons and evidence to support the opinion.</li>
            <li><span className="font-semibold text-slate-800">Conclusion / reiteration:</span> a summary that restates the opinion.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800">Language features</h2>
          <ul className="mt-3 space-y-2">
            <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" />Simple present tense</li>
            <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" />Logical connectors such as first, second, however, therefore</li>
            <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" />Modal verbs such as can, should, must</li>
            <li><CheckCircle2 className="mr-2 inline h-4 w-4 text-emerald-600" />Evaluative language to emphasize advantages or drawbacks</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800">Vocabulary of advantages and disadvantages</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-emerald-50 p-4"><p className="font-bold text-emerald-700">Advantages</p><p>convenient, efficient, benefit, security, transaction</p></div>
            <div className="rounded-xl bg-red-50 p-4"><p className="font-bold text-red-700">Disadvantages</p><p>risk, fraud, privacy, drawback, security issue</p></div>
          </div>
        </section>

        <section className="rounded-2xl bg-sky-50 p-5">
          <h2 className="text-xl font-bold text-slate-800">Example text</h2>
          <p className="mt-3 italic text-slate-700">E-money has become a popular payment method in modern society. Many people believe that it makes transactions faster and more convenient.</p>
          <p className="mt-3 italic text-slate-700">First, e-money helps people pay without carrying much cash. Second, digital transactions can make payment records easier to track. However, e-money also has drawbacks. Users may face security risks, technical problems, or difficulties when electronic services are unavailable.</p>
          <p className="mt-3 italic text-slate-700">In conclusion, e-money offers several benefits, but users should protect their personal information and use digital payment services responsibly.</p>
          <div className="mt-4 rounded-xl bg-white p-4 text-slate-700">
            <p><span className="font-semibold">Bahasa Indonesia:</span> Uang elektronik telah menjadi metode pembayaran yang populer di masyarakat modern. Banyak orang percaya bahwa uang elektronik membuat transaksi lebih cepat dan lebih praktis.</p>
            <p className="mt-2">Pertama, uang elektronik membantu orang membayar tanpa membawa banyak uang tunai. Kedua, transaksi digital dapat membuat catatan pembayaran lebih mudah dilacak. Namun, uang elektronik juga memiliki kelemahan. Pengguna dapat menghadapi risiko keamanan, masalah teknis, atau kesulitan ketika layanan elektronik tidak tersedia.</p>
            <p className="mt-2">Kesimpulannya, uang elektronik menawarkan beberapa manfaat, tetapi pengguna harus melindungi informasi pribadi mereka dan menggunakan layanan pembayaran digital dengan bertanggung jawab.</p>
          </div>
          <div className="mt-4 text-sm text-slate-600"><span className="font-semibold">Identifikasi:</span> Thesis = statement about e-money, Arguments = reasons and evidence, Conclusion = final summary.</div>
        </section>
      </div>
    </div>
  </main>
)

export default LessonPage
