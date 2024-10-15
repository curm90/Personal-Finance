'use client';

import { Plus } from 'lucide-react';

import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Payment, columns } from './columns';

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
];

export default function AccountsPage() {
  const { onOpen } = useNewAccount();

  return (
    <div className='-m-24 mx-auto w-full max-w-screen-2xl pb-10'>
      <Card className='border-none drop-shadow-sm'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <CardTitle className='line-clamp-1 text-xl'>Accounts</CardTitle>
          <Button onClick={onOpen} size='sm'>
            <Plus className='mr-2 size-4' /> Add account
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
