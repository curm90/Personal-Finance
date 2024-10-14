'use client';

import { useNewAccount } from '@/features/accounts/hooks/useNewAccount';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const { onOpen } = useNewAccount();

  return (
    <div>
      <Button onClick={onOpen}>Add account</Button>
    </div>
  );
}
