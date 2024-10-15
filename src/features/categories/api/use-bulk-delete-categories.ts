import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.categories)['bulk-delete']['$post']>;
type RequestType = InferRequestType<(typeof client.api.categories)['bulk-delete']['$post']>['json'];

export default function useBulkDeleteCategories() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categories['bulk-delete']['$post']({ json });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category(s) deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete category(s)');
    },
  });

  return mutation;
}
