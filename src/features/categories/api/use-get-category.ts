import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/hono';

export default function useGetCategory(id?: string) {
  return useQuery({
    enabled: !!id,
    queryKey: ['category', { id }],
    queryFn: async () => {
      const res = await client.api.categories[':id'].$get({ param: { id } });

      if (!res.ok) {
        throw new Error('Failed to fetch category');
      }

      const { data } = await res.json();

      return data;
    },
  });
}
