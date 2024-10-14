import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import useCreateAccount from '@/features/accounts/api/use-create-account';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import AccountForm, { type FormValues } from './AccountForm';

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Add a new account to your list</SheetDescription>
        </SheetHeader>
        <AccountForm defaultValues={{ name: '' }} onSubmit={handleSubmit} disabled={mutation.isPending} />
      </SheetContent>
    </Sheet>
  );
}
