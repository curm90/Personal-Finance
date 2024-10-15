'use client';

import { Loader2, Plus } from 'lucide-react';

import { useNewCategory } from '@/features/categories/hooks/useNewCategory';
import useGetCategories from '@/features/categories/api/use-get-categories';
import useBulkDeleteCategories from '@/features/categories/api/use-bulk-delete-categories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import { columns } from './columns';

export default function CategoriesPage() {
  const { onOpen } = useNewCategory();
  const categoriesQuery = useGetCategories();
  const deleteCategoriesMutation = useBulkDeleteCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategoriesMutation.isPending;

  if (categoriesQuery.isLoading) {
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
          <CardTitle className='line-clamp-1 text-xl'>Categories</CardTitle>
          <Button onClick={onOpen} size='sm'>
            <Plus className='mr-2 size-4' /> Add category
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey='name'
            disabled={isDisabled}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategoriesMutation.mutate({ ids });
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
