import { createServerSupabaseClient } from '@/core/infrastructure/supabase/server';

export async function getUserProfile() {
  const supabase = await createServerSupabaseClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    role: 'pending-profile',
  };
}
