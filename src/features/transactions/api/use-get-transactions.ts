import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { client } from '@/lib/hono';

export default function useGetTransactions() {
  const searchParams = useSearchParams();
  const to = searchParams.get('to') || '';
  const from = searchParams.get('from') || '';
  const accountId = searchParams.get('accountId') || '';

  return useQuery({
    queryKey: ['transactions', { to, from, accountId }],
    queryFn: async () => {
      const res = await client.api.transactions.$get({
        query: {
          to,
          from,
          accountId,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch transactions');
      }

      const { data } = await res.json();

      return data;
    },
  });
}
