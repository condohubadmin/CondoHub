import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/core/infrastructure/supabase/auth';
import { AuthShell } from '@/modules/auth/auth-shell';

export default async function PagamentosPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <AuthShell>
      <section className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold text-white">Pagamentos</h1>
          <p className="text-sm text-slate-400">Módulo reservado para cobranças e integrações com Mercado Pago.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
          <p className="text-slate-300">Este módulo será expandido com regras de cobrança e webhooks.</p>
        </div>
      </section>
    </AuthShell>
  );
}
