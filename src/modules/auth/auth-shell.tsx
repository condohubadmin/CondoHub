'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/core/providers/auth-provider';

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await signOut();
    router.push('/auth/sign-in');
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-slate-300">Carregando sessão...</div>;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center">
          <p className="text-lg font-medium text-white">Você precisa entrar para continuar.</p>
          <Link href="/auth/sign-in" className="mt-4 inline-block text-sm text-sky-400 hover:text-sky-300">
            Ir para login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
        <div>
          <p className="text-sm text-slate-400">Sessão ativa</p>
          <p className="text-sm font-medium text-white">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}
