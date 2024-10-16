import { toast } from 'sonner';
import { InferRequestType, InferResponseType } from 'hono';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from '@/lib/hono';

type ResponseType = InferResponseType<(typeof client.api.transactions)['bulk-create']['$post']>;
type RequestType = InferRequestType<(typeof client.api.transactions)['bulk-create']['$post']>['json'];

export default function useBulkCreateTransactions() {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transactions['bulk-create']['$post']({ json });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast.success('Transaction(s) created successfully');
    },
    onError: () => {
      toast.error('Failed to create transaction(s)');
    },
  });

  return mutation;
}