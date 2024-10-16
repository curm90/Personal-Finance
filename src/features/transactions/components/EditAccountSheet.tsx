import { Loader2 } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import AccountForm, { type FormValues } from './TransactionForm';
import useConfirm from '@/hooks/useConfirm';
import { useOpenAccount } from '../hooks/useOpenAccount';
import useGetAccount from '../api/use-get-account';
import useEditAccount from '../api/use-edit-transaction';
import useDeleteAccount from '../api/use-delete-transaction';

export default function EditAccountSheet() {
  const { isOpen, onClose, id } = useOpenAccount();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete account',
    'Are you sure? This action cannot be undone.'
  );

  const accountQuery = useGetAccount(id);
  const editAccountMutation = useEditAccount(id);
  const deleteAccountMutation = useDeleteAccount(id);

  const isLoading = accountQuery.isLoading;
  const isPending = editAccountMutation.isPending || deleteAccountMutation.isPending;

  function handleSubmit(values: FormValues) {
    editAccountMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteAccountMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  const defaultValues = accountQuery.data ? { name: accountQuery.data.name } : { name: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 animate-spin' />
            </div>
          ) : (
            <AccountForm
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
