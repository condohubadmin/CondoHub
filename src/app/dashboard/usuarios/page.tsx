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

export default function UsuariosPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
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

        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Lista de usuários</CardTitle>
              <CardDescription>Altere a classificação de cada usuário no Supabase.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
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
              )}
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
