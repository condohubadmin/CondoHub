export type UserRole = 'morador' | 'sindico' | 'porteiro' | 'conselheiro' | 'administradora';

export type CondoTenant = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
};

export type UserProfile = {
  id: string;
  userId: string;
  role: UserRole;
  condominiumId: string | null;
  displayName: string;
  email: string;
};
