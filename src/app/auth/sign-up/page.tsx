import { SignUpForm } from '@/modules/auth/sign-up-form';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_35%),linear-gradient(135deg,_#07111f_0%,_#0f172a_55%,_#111827_100%)] px-6 py-10">
      <div className="w-full max-w-5xl rounded-3xl border border-slate-800/80 bg-slate-950/70 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur lg:grid lg:grid-cols-[1fr_0.8fr] lg:gap-6">
        <div className="flex flex-col justify-center rounded-2xl bg-slate-900/70 p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">CondoHub</p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            Crie seu acesso e gerencie usuários com mais autonomia.
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            A criação da conta é feita diretamente no Supabase Auth, e o usuário passa a ter acesso ao painel de gestão.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center lg:mt-0">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
