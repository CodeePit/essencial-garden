import { cache } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const getCategories = cache(async (ctx: SupabaseClient<any, "public", any>, pagination: { skip: number, take:  number }) => {
  const { data, error } = await ctx.from('categories').select('*').range(pagination.skip, pagination.take);
  if (error) return null;
  return data;
})
