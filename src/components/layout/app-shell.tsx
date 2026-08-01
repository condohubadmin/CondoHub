import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navigation = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Usuários', href: '/dashboard/usuarios' },
  { label: 'Condomínios', href: '/dashboard/condominios' },
  { label: 'Pagamentos', href: '/dashboard/pagamentos' },
];

const syndicNavigation = [
  { label: 'Cadastro do condomínio', href: '/dashboard/condominio/cadastro' },
  { label: 'Cadastro de moradores', href: '/dashboard/moradores' },
  { label: 'Cadastro de unidades', href: '/dashboard/unidades' },
  { label: 'Comunicados', href: '/dashboard/comunicados' },
  { label: 'Financeiro', href: '/dashboard/financeiro' },
  { label: 'Cobranças via Mercado Pago', href: '/dashboard/mercadopago' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Documentos', href: '/dashboard/documentos' },
];

export function AppShell({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="w-full border-b border-slate-200 bg-white/80 p-4 backdrop-blur lg:w-72 lg:border-b-0 lg:border-r lg:p-6 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="mb-8 flex items-center justify-between lg:block">
            <div>
              <p className="text-lg font-semibold">CondoHub</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Gestão condominial</p>
            </div>
            <Button variant="outline" size="sm" className="lg:hidden">
              Menu
            </Button>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
                Síndico
              </p>
              <div className="space-y-1">
                {syndicNavigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </aside>

        <div className="flex-1">
          <header className="border-b border-slate-200 bg-white/80 px-4 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Painel</p>
                <h1 className="text-xl font-semibold">{title}</h1>
                {subtitle ? <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p> : null}
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Tema
                </Button>
                <Button size="sm">Novo usuário</Button>
              </div>
            </div>
          </header>

          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
