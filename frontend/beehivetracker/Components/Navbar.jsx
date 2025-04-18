'use client';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();


  const handleLogout = () => {
    Cookies.remove('token');
    toast("Logout successful redirecting to Home page")

   window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b shadow-sm px-4 py-2 flex items-center justify-between">
      <div>
        <Link href="/" className="text-xl font-bold text-blue-600">
          🐝 BeeTrail
        </Link>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              {/* <AvatarImage src={user.avatarUrl} alt={user.name} /> */}
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline">Beekeeper</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>login user</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push('/profile')}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
