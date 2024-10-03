'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { Menu } from 'lucide-react';

import NavButton from './NavButton';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';

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
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia('(max-width: 1023px)', false);

  function handleClick(href: string) {
    setIsOpen(false);
    router.push(href);
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant='outline'
            size='sm'
            className='border-none bg-white/10 font-normal text-white outline-none transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0'
          >
            <Menu className='size-4' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='px-2'>
          <nav className='flex flex-col gap-y-2 pt-6'>
            {routes.map((route) => (
              <Button
                variant={route.href === pathname ? 'secondary' : 'ghost'}
                key={route.href}
                onClick={() => handleClick(route.href)}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

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
