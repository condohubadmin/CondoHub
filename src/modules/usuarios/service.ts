import type { CreateUserCondominiumMembershipInput, CreateUserProfileInput, UserCondominiumMembership, UserProfile, UserProfileType } from '@/modules/usuarios/domain';
import type { UsersRepositoryPort } from '@/modules/usuarios/repository';

export class UsersService {
  constructor(private readonly repository: UsersRepositoryPort) {}

  async createProfile(input: CreateUserProfileInput): Promise<UserProfile> {
    this.ensureValidProfileType(input.profileType);
    return this.repository.createProfile(input);
  }

  async createMembership(input: CreateUserCondominiumMembershipInput): Promise<UserCondominiumMembership> {
    this.ensureValidProfileType(input.profileType);
    return this.repository.createMembership(input);
  }

  async listMembershipsByUser(userId: string): Promise<UserCondominiumMembership[]> {
    return this.repository.listMembershipsByUser(userId);
  }

  async listProfilesByUser(userId: string): Promise<UserProfile[]> {
    return this.repository.listProfilesByUser(userId);
  }

  private ensureValidProfileType(profileType: UserProfileType): void {
    const allowedProfiles: UserProfileType[] = ['morador', 'sindico', 'porteiro', 'conselheiro', 'administradora'];
    if (!allowedProfiles.includes(profileType)) {
      throw new Error(`Perfil inválido: ${profileType}`);
    }
  }
}
