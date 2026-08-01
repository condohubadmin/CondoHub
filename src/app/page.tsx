import Link from 'next/link';

const highlights = [
  'Gestão de moradores e acessos',
  'Cobranças e pagamentos em um só lugar',
  'Comunicação ágil para síndicos e administradoras',
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.2),_transparent_35%),linear-gradient(135deg,_#07111f_0%,_#0f172a_50%,_#111827_100%)] px-6 py-16 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800/80 bg-white/5 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">CondoHub</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Gestão condominial inteligente para síndicos, administradoras e moradores.
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/auth/sign-in" className="rounded-xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Fazer login
            </Link>
            <Link href="/dashboard" className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-100 transition hover:bg-slate-800">
              Ver painel
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/30">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">Plataforma completa</p>
            <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
              Controle, transparência e eficiência para o cotidiano do condomínio.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-300">
              O CondoHub reúne gestão de usuários, pagamentos, comunicação e organização operacional em uma experiência moderna e segura.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <span key={item} className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/40">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Por que escolher</p>
            <div className="mt-6 space-y-4">
              {[
                ['Segurança', 'Autenticação e controle de acesso com confiança'],
                ['Automação', 'Fluxos digitais para reduzir retrabalho'],
                ['Visibilidade', 'Painéis claros para decisões rápidas'],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <h3 className="font-semibold text-white">{title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
