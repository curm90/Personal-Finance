import prisma from "@/lib/db";

export default async function Dashboard() {
  const expenses = await prisma.expense.findMany();
  console.log({ expenses });
  return (
    <div>
      <h1>Your expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li className='flex flex-col gap-1' key={expense.id}>
            <span>
              £{expense.amount} - {expense.title}
            </span>
            <span>{new Intl.DateTimeFormat("en-US").format(expense.createdAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
