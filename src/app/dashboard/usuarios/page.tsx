import { AppShell } from '@/components/layout/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const users = [
  { name: 'Ana Souza', email: 'ana@condohub.com', role: 'Síndica', condominios: '2' },
  { name: 'Bruno Lima', email: 'bruno@condohub.com', role: 'Morador', condominios: '1' },
  { name: 'Carla Mendes', email: 'carla@condohub.com', role: 'Porteiro', condominios: '3' },
];

export default function UsuariosPage() {
  return (
    <AppShell title="Usuários" subtitle="Gerenciamento de perfis e condomínios">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Usuários do sistema</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Perfis e múltiplos condomínios</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="Buscar usuário" className="w-full sm:w-64" />
            <Button>Adicionar</Button>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          <Card>
            <CardHeader>
              <CardTitle>Lista de usuários</CardTitle>
              <CardDescription>Interface visual para gestão de perfis.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Perfil</TableHead>
                    <TableHead>Condomínios</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>{user.condominios}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Perfis disponíveis</CardTitle>
                <CardDescription>Morador, síndico, porteiro, conselheiro e administradora.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Morador', 'Síndico', 'Porteiro', 'Conselheiro', 'Administradora'].map((role) => (
                  <div key={role} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-800">
                    {role}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
                <CardDescription>Visão geral da interface.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
                  <span>Usuários ativos</span>
                  <strong>3</strong>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800">
                  <span>Perfis disponíveis</span>
                  <strong>5</strong>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
