import Header from '@/components/Header';

export default function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
}
