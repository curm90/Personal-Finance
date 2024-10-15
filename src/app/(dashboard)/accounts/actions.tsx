'use client';

import { Edit, MoreHorizontal } from 'lucide-react';

import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Actions({ id }: { id: string }) {
  const { onOpen } = useOpenAccount();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='size-8 p-0'>
            <MoreHorizontal className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem disabled={false} onClick={() => onOpen(id)}>
            <Edit className='mr-2 size-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
