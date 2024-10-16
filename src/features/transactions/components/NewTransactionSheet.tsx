import { Loader2 } from 'lucide-react';
import { useNewTransaction } from '@/features/transactions/hooks/useNewTransaction';
import useCreateTransaction from '@/features/transactions/api/use-create-transaction';
import useCreateCategory from '@/features/categories/api/use-create-category';
import useCreateAccount from '@/features/accounts/api/use-create-account';
import useGetCategories from '@/features/categories/api/use-get-categories';
import useGetAccounts from '@/features/accounts/api/use-get-accounts';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import TransactionForm, { type ApiFormValues } from './TransactionForm';

export default function NewTransactionSheet() {
  const { isOpen, onClose } = useNewTransaction();

  const createTransactionMutation = useCreateTransaction();

  function handleSubmit(values: ApiFormValues) {
    createTransactionMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

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

  const isPending =
    createTransactionMutation.isPending || accountMutation.isPending || categoryMutation.isPending;
  const isLoading = accountsQuery.isLoading || categoriesQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction to your list</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loader2 className='size-4 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <TransactionForm
            onSubmit={handleSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            accountOptions={accountOptions}
            handleCreateAccount={handleCreateAccount}
            handleCreateCategory={handleCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
