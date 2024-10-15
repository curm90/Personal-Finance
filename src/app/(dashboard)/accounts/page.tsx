'use client';

import { Loader2, Plus } from 'lucide-react';

import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import useGetAccounts from '@/features/accounts/api/use-get-accounts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from './columns';

export default function AccountsPage() {
  const { onOpen } = useNewAccount();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  if (accountsQuery.isLoading) {
    return (
      <div className='-m-24 mx-auto w-full max-w-screen-2xl pb-10'>
        <Card className='border-none drop-shadow-sm'>
          <CardHeader>
            <Skeleton className='h-8 w-48' />
          </CardHeader>
          <CardContent>
            <div className='flex h-[500px] items-center justify-center'>
              <Loader2 className='size-6 animate-spin text-slate-300' />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <DataTable columns={columns} data={accounts} filterKey='email' />
        </CardContent>
      </Card>
    </div>
  );
}
