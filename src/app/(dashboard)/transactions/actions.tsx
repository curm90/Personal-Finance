'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import useDeleteTransaction from '@/features/transactions/api/use-delete-transaction';
import { useOpenTransaction } from '@/features/transactions/hooks/useOpenTransaction';
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
    'Delete transaction',
    'Are you sure? This action cannot be undone.'
  );
  const deleteTransactionMutation = useDeleteTransaction(id);
  const { onOpen } = useOpenTransaction();

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteTransactionMutation.mutate();
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
          <DropdownMenuItem disabled={deleteTransactionMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={deleteTransactionMutation.isPending}>
            <Trash className='mr-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
