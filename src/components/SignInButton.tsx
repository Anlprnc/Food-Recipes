'use client';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import Link from 'next/link';

const SigninButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Image src={session.user.image ?? ''} alt={session.user.name ?? ''} className=" rounded-full" width={35} height={35} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <p className="text-black">{session.user.name}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={'/profile'}>Profile</Link>
            </DropdownMenuItem>
            {session.user.role === 'admin' && (
              <DropdownMenuItem>
                <Link href={'/admin'}>Admin</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem>
              <button onClick={() => signOut()} className="text-red-600">
                Sign Out
              </button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <button onClick={() => signIn()} className="text-white ml-auto p-0.5 px-2">
      Sign In
    </button>
  );
};

export default SigninButton;
