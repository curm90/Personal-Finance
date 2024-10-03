import { UserButton } from '@clerk/nextjs';

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard page</h1>
      <UserButton afterSwitchSessionUrl='/' />
    </div>
  );
}
