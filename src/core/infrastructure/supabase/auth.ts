import { createServerSupabaseClient } from '@/core/infrastructure/supabase/server';
import { redirect } from 'next/navigation';

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/sign-in');
  }

  return user;
}

export async function signOutAction() {
  'use server';

  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/auth/sign-in');
}

export async function signInWithEmailAndPassword(email: string, password: string) {
  'use server';

  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, user: data.user };
}
