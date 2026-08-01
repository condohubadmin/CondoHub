import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/core/infrastructure/supabase/auth';
import { AuthShell } from '@/modules/auth/auth-shell';

export default async function CondominiosPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <AuthShell>
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Condomínios</h1>
          <p className="text-sm text-slate-400">Lista de condomínios associados ao usuário.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-300">Esta rota representa o módulo de administração de condomínios.</p>
        </div>
      </section>
    </AuthShell>
  );
}
