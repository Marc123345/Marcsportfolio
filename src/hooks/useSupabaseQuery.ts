import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSupabase } from '@/providers/SupabaseProvider';

interface UseSupabaseQueryOptions<T> {
  queryKey: string[];
  table: string;
  select?: string;
  match?: Record<string, any>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
  enabled?: boolean;
}

export function useSupabaseQuery<T>({
  queryKey,
  table,
  select = '*',
  match,
  order,
  limit,
  enabled = true,
}: UseSupabaseQueryOptions<T>) {
  const { isConnected } = useSupabase();

  return useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase.from(table).select(select);

      if (match) {
        query = query.match(match);
      }

      if (order) {
        query = query.order(order.column, { ascending: order.ascending });
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data as T[];
    },
    enabled: enabled && isConnected,
  });
}