// import Dashboard from "@/components/Dashboard";

import AddExpenseForm from '@/components/AddExpenseForm';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <div>
      {/* <Dashboard /> */}
      <UserButton afterSwitchSessionUrl='/' />
      <AddExpenseForm />
    </div>
  );
}
