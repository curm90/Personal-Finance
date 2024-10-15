import { Loader2 } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import CategoryForm, { type FormValues } from './CategoryForm';
import useConfirm from '@/hooks/useConfirm';
import { useOpenCategory } from '../hooks/useOpenCategory';
import useGetCategory from '../api/use-get-category';
import useDeleteCategory from '../api/use-delete-category';
import useEditCategory from '../api/use-edit-category';

export default function EditCategorySheet() {
  const { isOpen, onClose, id } = useOpenCategory();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete category',
    'Are you sure? This action cannot be undone.'
  );

  const categoryQuery = useGetCategory(id);
  const editCategoryMutation = useEditCategory(id);
  const deleteCategoryMutation = useDeleteCategory(id);

  const isLoading = categoryQuery.isLoading;
  const isPending = editCategoryMutation.isPending || deleteCategoryMutation.isPending;

  function handleSubmit(values: FormValues) {
    editCategoryMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteCategoryMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  const defaultValues = categoryQuery.data ? { name: categoryQuery.data.name } : { name: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 animate-spin' />
            </div>
          ) : (
            <CategoryForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              disabled={isPending}
              onDelete={handleDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
