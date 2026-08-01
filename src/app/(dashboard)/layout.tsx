import type { ReactNode } from 'react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <aside className="border-b border-slate-800 bg-slate-900/70 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">CondoHub</p>
            <p className="text-xs text-slate-400">Painel de gestão</p>
          </div>
          <nav className="flex gap-3 text-sm text-slate-300">
            <Link href="/dashboard" className="hover:text-white">Resumo</Link>
            <Link href="/dashboard/condominios" className="hover:text-white">Condomínios</Link>
            <Link href="/dashboard/pagamentos" className="hover:text-white">Pagamentos</Link>
          </nav>
        </div>
      </aside>
      <main className="p-6">{children}</main>
    </div>
  );
}
