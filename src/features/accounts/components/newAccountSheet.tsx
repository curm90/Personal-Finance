import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import AccountForm, { type FormValues } from './AccountForm';

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  function handleSubmit(values: FormValues) {
    console.log({ values });
  }

  return (
    <Sheet open={!isOpen} onOpenChange={onClose}>
      <SheetContent className='space-y-4'>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Add a new account to your list</SheetDescription>
        </SheetHeader>
        <AccountForm defaultValues={{ name: '' }} onSubmit={handleSubmit} disabled={false} />
      </SheetContent>
    </Sheet>
  );
}
