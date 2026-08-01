'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/core/infrastructure/supabase/client-browser';

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError('A confirmação de senha não confere.');
      return;
    }

    setLoading(true);

    const supabase = createBrowserSupabaseClient();

    if (!supabase) {
      setError('As variáveis do Supabase ainda não foram configuradas.');
      setLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/sign-in`,
      },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message ?? 'Não foi possível criar o usuário.');
      return;
    }

    if (data.user) {
      setSuccess('Usuário criado com sucesso. Você já pode fazer login.');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => router.push('/auth/sign-in'), 1200);
      return;
    }

    setSuccess('Conta criada. Verifique o e-mail e faça login no próximo passo.');
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">CondoHub</p>
        <h1 className="text-2xl font-semibold text-white">Criar conta</h1>
        <p className="text-sm text-slate-400">Cadastre um novo acesso no Supabase Auth para entrar no painel.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block text-sm text-slate-300">
          E-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          Senha
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            required
          />
        </label>

        <label className="block text-sm text-slate-300">
          Confirmar senha
          <input
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            required
          />
        </label>

        {error ? <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{error}</p> : null}
        {success ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">{success}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <p className="mt-6 text-sm text-slate-400">
        Já possui acesso?{' '}
        <Link href="/auth/sign-in" className="font-medium text-cyan-400 hover:text-cyan-300">
          Entrar
        </Link>
      </p>
    </div>
  );
}
