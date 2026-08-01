import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/core/infrastructure/supabase/auth';
import { AuthShell } from '@/modules/auth/auth-shell';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <AuthShell>
      <section className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Visão geral do condomínio selecionado.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Condomínios</p>
            <p className="mt-2 text-2xl font-semibold text-white">1</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Moradores</p>
            <p className="mt-2 text-2xl font-semibold text-white">24</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm text-slate-400">Em aberto</p>
            <p className="mt-2 text-2xl font-semibold text-white">3</p>
          </div>
        </div>
      </section>
    </AuthShell>
  );
}
