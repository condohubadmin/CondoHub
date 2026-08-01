import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 px-6 text-center">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-sky-400">CondoHub</p>
        <h1 className="text-4xl font-semibold text-white sm:text-6xl">
          Plataforma de gestão condominial preparada para crescer.
        </h1>
        <p className="text-lg text-slate-300">
          Arquitetura multi-tenant, módulos organizados e base para integração com Supabase, Mercado Pago e Render.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/dashboard"
          className="rounded-lg bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-400"
        >
          Entrar no painel
        </Link>
        <Link
          href="/auth/sign-in"
          className="rounded-lg border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Fazer login
        </Link>
      </div>
    </main>
  );
}
