'use client';

import { usePathname } from 'next/navigation';
import NavButton from './NavButton';

const routes = [
  {
    href: '/',
    label: 'Dashboard',
  },
  {
    href: '/transactions',
    label: 'Transactions',
  },
  {
    href: '/accounts',
    label: 'Accounts',
  },
  {
    href: '/categories',
    label: 'Categories',
  },
  {
    href: '/settings',
    label: 'Settings',
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className='hidden lg:flex'>
      <ul className='flex items-center gap-x-2 overflow-x-auto'>
        {routes.map((route) => (
          <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={route.href === pathname}
          />
        ))}
      </ul>
    </nav>
  );
}
