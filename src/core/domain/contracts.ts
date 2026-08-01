export interface TenantContextPort {
  condominiumId: string | null;
  userRole: string | null;
}

export interface RepositoryPort<T> {
  findById(id: string): Promise<T | null>;
  list(): Promise<T[]>;
}
