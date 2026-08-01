import type { CreateUserCondominiumMembershipInput, CreateUserProfileInput, UserCondominiumMembership, UserProfile } from '@/modules/usuarios/domain';

export interface UsersRepositoryPort {
  createProfile(input: CreateUserProfileInput): Promise<UserProfile>;
  createMembership(input: CreateUserCondominiumMembershipInput): Promise<UserCondominiumMembership>;
  listMembershipsByUser(userId: string): Promise<UserCondominiumMembership[]>;
  listProfilesByUser(userId: string): Promise<UserProfile[]>;
}

export class InMemoryUsersRepository implements UsersRepositoryPort {
  private profiles: UserProfile[] = [];
  private memberships: UserCondominiumMembership[] = [];

  async createProfile(input: CreateUserProfileInput): Promise<UserProfile> {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      userId: input.userId,
      profileType: input.profileType,
      displayName: input.displayName,
      email: input.email,
      createdAt: new Date().toISOString(),
    };

    this.profiles.push(profile);
    return profile;
  }

  async createMembership(input: CreateUserCondominiumMembershipInput): Promise<UserCondominiumMembership> {
    const membership: UserCondominiumMembership = {
      id: crypto.randomUUID(),
      userId: input.userId,
      condominiumId: input.condominiumId,
      profileType: input.profileType,
      createdAt: new Date().toISOString(),
    };

    this.memberships.push(membership);
    return membership;
  }

  async listMembershipsByUser(userId: string): Promise<UserCondominiumMembership[]> {
    return this.memberships.filter((membership) => membership.userId === userId);
  }

  async listProfilesByUser(userId: string): Promise<UserProfile[]> {
    return this.profiles.filter((profile) => profile.userId === userId);
  }
}
