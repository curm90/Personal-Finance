import CategoryForm, { type FormValues } from './CategoryForm';
import { useNewCategory } from '../hooks/useNewCategory';
import useCreateCategory from '../api/use-create-category';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function NewCategorySheet() {
  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();

  function handleSubmit(values: FormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>Create a new category to organise your transactions</SheetDescription>
        </SheetHeader>
        <CategoryForm defaultValues={{ name: '' }} onSubmit={handleSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
}
