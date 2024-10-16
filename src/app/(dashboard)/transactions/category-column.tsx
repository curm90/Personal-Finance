import { TriangleAlert } from 'lucide-react';

import { useOpenCategory } from '@/features/categories/hooks/useOpenCategory';
import { useOpenTransaction } from '@/features/transactions/hooks/useOpenTransaction';
import { cn } from '@/lib/utils';

type CategoryColumnProps = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export function CategoryColumn({ id, category, categoryId }: CategoryColumnProps) {
  const { onOpen: onOpenCategory } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  function handleClick() {
    if (categoryId) {
      onOpenCategory(categoryId);
    } else {
      onOpenTransaction(id);
    }
  }

  return (
    <div
      className={cn('flex cursor-pointer items-center hover:underline', !category && 'text-rose-500')}
      onClick={handleClick}
    >
      {!category && <TriangleAlert className='mr-2 size-4 shrink-0' />}
      <span>{category || 'Uncategorized'}</span>
    </div>
  );
}
