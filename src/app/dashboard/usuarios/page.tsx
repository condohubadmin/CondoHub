import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const users = [
  { name: 'Ana Souza', email: 'ana@condohub.com', role: 'Síndica', condominios: '2', status: 'Ativo' },
  { name: 'Bruno Lima', email: 'bruno@condohub.com', role: 'Morador', condominios: '1', status: 'Em análise' },
  { name: 'Carla Mendes', email: 'carla@condohub.com', role: 'Porteiro', condominios: '3', status: 'Ativo' },
];

export default function UsuariosPage() {
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

        <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle>Lista de usuários</CardTitle>
              <CardDescription>Visualize os perfis cadastrados e os acessos associados.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfil do usuário</CardTitle>
                <CardDescription>Informações principais para organização e acesso.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">E-mail principal</p>
                  <p className="text-slate-500 dark:text-slate-400">usuario@condohub.com</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">Permissões</p>
                  <p className="text-slate-500 dark:text-slate-400">Visualização, edição e gestão de condomínio</p>
                </div>
                <div className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-800">
                  <p className="font-medium">Condomínios vinculados</p>
                  <p className="text-slate-500 dark:text-slate-400">Residencial Aurora, Torre Central</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
                <CardDescription>Visão geral da gestão de usuários.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
                  <span>Usuários ativos</span>
                  <strong>2</strong>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
                  <span>Perfis disponíveis</span>
                  <strong>5</strong>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
                  <span>Aguardando aprovação</span>
                  <strong>1</strong>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
