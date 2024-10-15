'use client';

import { Edit, MoreHorizontal, Trash } from 'lucide-react';

import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';
import useDeleteAccount from '@/features/accounts/api/use-delete-account';
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
    'Delete account',
    'Are you sure? This action cannot be undone.'
  );
  const deleteAccountMutation = useDeleteAccount(id);
  const { onOpen } = useOpenAccount();

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteAccountMutation.mutate();
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
          <DropdownMenuItem disabled={deleteAccountMutation.isPending} onClick={() => onOpen(id)}>
            <Edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} disabled={deleteAccountMutation.isPending}>
            <Trash className='mr-2 size-4' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
