"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, PhoneCall, Menu } from 'lucide-react';
import siteIcon from '../public/images/SilaaimachineLogo.png';
import Link from 'next/link';
import ThemeToggle from '../_components/ThemeToggle';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Header = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden md:flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-50 bg-white dark:bg-black'>
        <div>
          <Link href="/">
            <Image src={siteIcon} alt='logo' width={200} height={200} />
          </Link>
        </div>

        <div className='flex gap-5 items-center'>
          <Link href="/" className='hover:font-semibold hover:underline hover:decoration-theme_color hover:underline-offset-8'>Home</Link>
          <Link href="/store" className='hover:font-semibold hover:underline hover:decoration-theme_color hover:underline-offset-8'>Store</Link>
         
        </div>

        <div className='flex gap-5 items-center'>
          <Search className='h-5 w-5' />
          <Button variant="outline" as="a" href="cd nextjs_smen">
            <PhoneCall className='h-5 w-5' />Call Us
          </Button>
          <Button>Login</Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-10 backdrop-blur-sm'>
        <div>
          <Link href="/">
            <Image src={siteIcon} alt='logo' width={100} height={100} />
          </Link>
        </div>
        
        {/* Mobile Menu Drawer using Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='h-8 w-8 cursor-pointer' />
          </SheetTrigger>
          <SheetContent side="right" className="w-64">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-3 mt-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/store" onClick={() => setIsMenuOpen(false)}>Store</Link>
          
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Header;