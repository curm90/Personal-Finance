import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className='grid min-h-screen grid-cols-1 lg:grid-cols-2'>
      <div className='h-full flex-col items-center lg:flex'>
        <div className='space-y-4 pt-16 text-center'>
          <h1 className='text-3xl font-semibold text-gray-900'>Welcome back</h1>
          <p className='text-base text-gray-700'>Sign in, or create an account to see your dashboard.</p>
        </div>
        <div className='mt-8 flex items-center justify-center'>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='text-muted-foreground animate-spin' />
          </ClerkLoading>
        </div>
      </div>
      <div className='hidden h-full items-center justify-center bg-blue-600 lg:flex'>
        <Image src='/logo.svg' height={100} width={100} alt='Logo' />
      </div>
    </div>
  );
}
