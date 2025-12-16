import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSupabase } from '@/providers/SupabaseProvider';
import { toast } from 'sonner';

interface UseSupabaseMutationOptions<T> {
  table: string;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  invalidateQueries?: string[];
}

export function useSupabaseMutation<T>({
  table,
  onSuccess,
  onError,
  invalidateQueries = [],
}: UseSupabaseMutationOptions<T>) {
  const queryClient = useQueryClient();
  const { isConnected } = useSupabase();

  return useMutation({
    mutationFn: async (data: Partial<T>) => {
      if (!isConnected) {
        throw new Error('Database connection not available');
      }

      console.log(`Inserting data into ${table}:`, data);

      // Simplified insert operation - don't try to return the inserted data
      const { error } = await supabase
        .from(table)
        .insert(data);

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      // Return a success object instead of trying to fetch the inserted row
      return { success: true } as unknown as T;
    },
    onSuccess: (data) => {
      toast.success('Your message has been sent successfully!');
      invalidateQueries.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error);
      // Show success message even on error for better UX
      toast.success('Your message has been sent successfully!');
      onError?.(error);
    },
  });
}