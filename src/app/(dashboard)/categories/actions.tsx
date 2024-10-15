'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import useDeleteCategory from '@/features/categories/api/use-delete-category';
import { useOpenCategory } from '@/features/categories/hooks/useOpenCategory';
import useConfirm from '@/hooks/useConfirm';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Actions({ id }: { id: string }) {
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete category',
    'Are you sure? This action cannot be undone.'
  );
  const deleteCategoryMutation = useDeleteCategory(id);
  const { onOpen } = useOpenCategory();

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteCategoryMutation.mutate();
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem disabled={deleteCategoryMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={deleteCategoryMutation.isPending}>
            <Trash className='mr-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
