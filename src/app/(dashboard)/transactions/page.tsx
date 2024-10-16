'use client';

import { Loader2, Plus } from 'lucide-react';

import { useNewTransaction } from '@/features/transactions/hooks/useNewTransaction';
import useGetTransactions from '@/features/transactions/api/use-get-transactions';
import useBulkDeleteTransactions from '@/features/transactions/api/use-bulk-delete-transactions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from './columns';

export default function TransactionsPage() {
  const { onOpen } = useNewTransaction();
  const transactionsQuery = useGetTransactions();
  const deleteTransactionsMutation = useBulkDeleteTransactions();
  const transactions = transactionsQuery.data || [];

  const isDisabled = transactionsQuery.isLoading || deleteTransactionsMutation.isPending;

  if (transactionsQuery.isLoading) {
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
          <CardTitle className='line-clamp-1 text-xl'>Transaction History</CardTitle>
          <Button onClick={onOpen} size='sm'>
            <Plus className='mr-2 size-4' /> Add transaction
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={transactions}
            filterKey='name'
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactionsMutation.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
