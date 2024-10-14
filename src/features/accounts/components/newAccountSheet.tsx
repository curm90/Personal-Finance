import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';

export default function NewAccountSheet() {
  const { isOpen, onClose } = useNewAccount();

  return (
    <Sheet open={!isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Add a new account to your list</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
