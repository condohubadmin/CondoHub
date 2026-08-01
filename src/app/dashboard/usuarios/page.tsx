'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createBrowserSupabaseClient } from '@/core/infrastructure/supabase/client-browser';

type Role = 'sindico' | 'morador' | 'porteiro' | 'admin';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
};

const roleLabels: Record<Role, string> = {
  sindico: 'Síndico',
  morador: 'Morador',
  porteiro: 'Porteiro',
  admin: 'Admin',
};

const roleOptions: Role[] = ['sindico', 'morador', 'porteiro', 'admin'];

const sections = [
  { key: 'overview', label: 'Visão geral' },
  { key: 'roles', label: 'Perfis' },
  { key: 'permissions', label: 'Permissões' },
  { key: 'activity', label: 'Atividades' },
] as const;

export default function UsuariosPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [activeSection, setActiveSection] = useState<(typeof sections)[number]['key']>('overview');
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadProfiles() {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setMessage('As variáveis do Supabase ainda não foram configuradas.');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from('profiles').select('id, email, full_name, role').order('email');

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setProfiles((data ?? []) as Profile[]);
    setLoading(false);
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  async function updateRole(profileId: string, role: Role) {
    const supabase = createBrowserSupabaseClient();
    if (!supabase) {
      setMessage('As variáveis do Supabase ainda não foram configuradas.');
      return;
    }

    setSavingId(profileId);
    const { error } = await supabase.from('profiles').update({ role }).eq('id', profileId);
    setSavingId(null);

    if (error) {
      setMessage(error.message);
      return;
    }

    setProfiles((current) => current.map((profile) => (profile.id === profileId ? { ...profile, role } : profile)));
    setMessage('Classificação atualizada com sucesso.');
  }

  return (
    <AppShell title="Usuários" subtitle="Gestão de perfis, permissões e acesso condominial">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Área do usuário</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Gerencie contas, perfis e permissões do condomínio</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Buscar usuário" className="w-full sm:w-64" />
            <Button>Adicionar</Button>
          </div>
        </div>

        {message ? <p className="rounded-lg border border-cyan-500/20 bg-cyan-500/10 px-3 py-2 text-sm text-cyan-700 dark:text-cyan-300">{message}</p> : null}

        <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${activeSection === section.key ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>{activeSection === 'overview' ? 'Visão geral' : activeSection === 'roles' ? 'Perfis' : activeSection === 'permissions' ? 'Permissões' : 'Atividades'}</CardTitle>
              <CardDescription>
                {activeSection === 'overview' && 'Acompanhe o estado dos usuários e suas classificações.'}
                {activeSection === 'roles' && 'Altere a classificação de cada usuário no Supabase.'}
                {activeSection === 'permissions' && 'Defina o acesso e os papéis da área do condomínio.'}
                {activeSection === 'activity' && 'Monitore as movimentações e o histórico do módulo.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSection === 'overview' ? (
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="text-sm text-slate-500">Usuários ativos</p>
                    <p className="text-2xl font-semibold">{profiles.length}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="text-sm text-slate-500">Síndicos</p>
                    <p className="text-2xl font-semibold">{profiles.filter((profile) => profile.role === 'sindico').length}</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="text-sm text-slate-500">Moradores</p>
                    <p className="text-2xl font-semibold">{profiles.filter((profile) => profile.role === 'morador').length}</p>
                  </div>
                </div>
              ) : null}

              {activeSection === 'roles' ? (
                loading ? (
                  <p className="text-sm text-slate-500">Carregando usuários...</p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>E-mail</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell>{profile.full_name ?? 'Sem nome'}</TableCell>
                          <TableCell>{profile.email}</TableCell>
                          <TableCell>{roleLabels[profile.role]}</TableCell>
                          <TableCell>
                            <select
                              value={profile.role}
                              onChange={(event) => updateRole(profile.id, event.target.value as Role)}
                              disabled={savingId === profile.id}
                              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
                            >
                              {roleOptions.map((role) => (
                                <option key={role} value={role}>
                                  {roleLabels[role]}
                                </option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
              ) : null}

              {activeSection === 'permissions' ? (
                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="font-medium">Permissões por perfil</p>
                    <p className="mt-1 text-sm text-slate-500">Síndico: acesso total. Morador: leitura e solicitação. Porteiro: gestão de entradas. Admin: administração completa.</p>
                  </div>
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="font-medium">Ações rápidas</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Button size="sm">Gerenciar permissões</Button>
                      <Button variant="outline" size="sm">Duplicar perfil</Button>
                    </div>
                  </div>
                </div>
              ) : null}

              {activeSection === 'activity' ? (
                <div className="space-y-3">
                  <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                    <p className="font-medium">Últimas atividades</p>
                    <p className="mt-1 text-sm text-slate-500">Nenhuma atividade recente registrada ainda.</p>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfil do usuário</CardTitle>
                <CardDescription>Estas classificações são armazenadas na tabela profiles do Supabase.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">Opções disponíveis</p>
                  <p className="text-slate-500 dark:text-slate-400">Síndico, Morador, Porteiro e Admin.</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">Como funciona</p>
                  <p className="text-slate-500 dark:text-slate-400">A classificação é alterada diretamente na tabela profiles e refletida na interface.</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">Navegação interna</p>
                  <p className="text-slate-500 dark:text-slate-400">Use as abas para alternar entre Visão geral, Perfis, Permissões e Atividades.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
