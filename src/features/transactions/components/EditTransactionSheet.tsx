import { Loader2 } from 'lucide-react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import TransactionForm, { type ApiFormValues } from './TransactionForm';
import useConfirm from '@/hooks/useConfirm';
import { useOpenTransaction } from '../hooks/useOpenTransaction';
import useGetTransaction from '../api/use-get-transaction';
import useEditTransaction from '../api/use-edit-transaction';
import useDeleteTransaction from '../api/use-delete-transaction';
import useGetAccounts from '@/features/accounts/api/use-get-accounts';
import useCreateAccount from '@/features/accounts/api/use-create-account';
import useCreateCategory from '@/features/categories/api/use-create-category';
import useGetCategories from '@/features/categories/api/use-get-categories';

export default function EditTransactionSheet() {
  const { isOpen, onClose, id } = useOpenTransaction();
  const [ConfirmDialog, confirm] = useConfirm(
    'Delete transaction',
    'Are you sure? This action cannot be undone.'
  );

  const transactionQuery = useGetTransaction(id);
  const editTransactionMutation = useEditTransaction(id);
  const deleteTransactionMutation = useDeleteTransaction(id);

  const accountsQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const categoriesQuery = useGetCategories();
  const categoryMutation = useCreateCategory();

  function handleCreateCategory(name: string) {
    return categoryMutation.mutate({ name });
  }

  function handleCreateAccount(name: string) {
    return accountMutation.mutate({ name });
  }

  const categoryOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const accountOptions = (accountsQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));

  const isLoading = transactionQuery.isLoading || accountsQuery.isLoading || categoriesQuery.isLoading;
  const isPending =
    editTransactionMutation.isPending ||
    deleteTransactionMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  function handleSubmit(values: ApiFormValues) {
    editTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  async function handleDelete() {
    const confirmed = await confirm();
    if (confirmed) {
      deleteTransactionMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  }

  const defaultValues = transactionQuery.data
    ? {
        accountId: transactionQuery.data.accountId,
        categoryId: transactionQuery.data.categoryId,
        amount: transactionQuery.data.amount.toString(),
        date: transactionQuery.data.date ? new Date(transactionQuery.data.date) : new Date(),
        payee: transactionQuery.data.payee,
        notes: transactionQuery.data.notes,
      }
    : { accountId: '', categoryId: '', date: new Date(), amount: '', payee: '', notes: '' };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className='space-y-4'>
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className='absolute inset-0 flex items-center justify-center'>
              <Loader2 className='size-4 animate-spin' />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              disabled={isPending}
              categoryOptions={categoryOptions}
              accountOptions={accountOptions}
              handleCreateAccount={handleCreateAccount}
              handleCreateCategory={handleCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
