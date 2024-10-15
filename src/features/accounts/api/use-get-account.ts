import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export default function useGetAccount(id?: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ['account', { id }],
    queryFn: async () => {
      const res = await client.api.accounts[':id'].$get({ param: { id } });

      if (!res.ok) {
        throw new Error('Failed to fetch account');
      }

      const { data } = await res.json();

      return data;
    },
  });
}
