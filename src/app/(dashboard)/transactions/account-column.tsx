import { useOpenAccount } from '@/features/accounts/hooks/useOpenAccount';

type AccountColumnProps = {
  account: string;
  accountId: string;
};

export function AccountColumn({ account, accountId }: AccountColumnProps) {
  const { onOpen } = useOpenAccount();

  function handleClick() {
    onOpen(accountId);
  }

  return (
    <div className='flex cursor-pointer items-center hover:underline' onClick={handleClick}>
      <span>{account}</span>
    </div>
  );
}
