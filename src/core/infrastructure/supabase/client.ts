export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
};

export function createSupabaseClient() {
  return {
    config: supabaseConfig,
    note: 'Cliente Supabase será implementado aqui quando a integração estiver pronta.',
  };
}
