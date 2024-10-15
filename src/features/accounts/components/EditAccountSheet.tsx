import { Loader2 } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import AccountForm, { type FormValues } from './AccountForm';
import { useOpenAccount } from '../hooks/useOpenAccount';
import useGetAccount from '../api/use-get-account';
import useEditAccount from '../api/use-edit-account';

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();

  const accountQuery = useGetAccount(id);
  const editAccountMutation = useEditAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = editAccountMutation.isPending;

  function handleSubmit(values: FormValues) {
    editAccountMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: '' };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>Edit Account</SheetTitle>
          <SheetDescription>Edit and existing account</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 animate-spin' />
          </div>
        ) : (
          <AccountForm id={id} defaultValues={defaultValues} onSubmit={handleSubmit} disabled={isPending} />
        )}
      </SheetContent>
    </Sheet>
  );
}
