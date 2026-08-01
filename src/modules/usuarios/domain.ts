export type UserProfileType = 'morador' | 'sindico' | 'porteiro' | 'conselheiro' | 'administradora';

export interface UserProfile {
  id: string;
  userId: string;
  profileType: UserProfileType;
  displayName: string;
  email: string;
  createdAt: string;
}

export interface UserCondominiumMembership {
  id: string;
  userId: string;
  condominiumId: string;
  profileType: UserProfileType;
  createdAt: string;
}

export interface CreateUserProfileInput {
  userId: string;
  profileType: UserProfileType;
  displayName: string;
  email: string;
}

export interface CreateUserCondominiumMembershipInput {
  userId: string;
  condominiumId: string;
  profileType: UserProfileType;
}
