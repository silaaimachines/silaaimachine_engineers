"use client";
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, PhoneCall, Menu, X } from 'lucide-react';
import siteIcon from '../public/images/02.png';
import Link from 'next/link';
import ThemeToggle from '../_components/ThemeToggle';



const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage the mobile drawer
  
  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden md:flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-10 backdrop-blur-sm'>
        <div>
        <Link href="/">
          <Image src={siteIcon} alt='logo' width={200} height={200} />
        </Link>
        </div>

        <div className='flex gap-5 items-center'>
          <Link href="/">Home</Link>
          <Link href="/store">Store</Link>
          <Link href="/categories">Categories</Link>
        </div>

        <div className='flex gap-5 items-center'>
          <Search className='h-5 w-5' />
          <Button variant="outline" as="a" href="cd nextjs_smen">
            <PhoneCall className='h-5 w-5' />Call Us
          </Button>
          <Button>Login</Button>
          <ThemeToggle/>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-10 backdrop-blur-sm'>
        <div>
          <Link href="/">
            <Image src={siteIcon} alt='logo' width={100} height={100} />
          </Link>
        </div>
        <Menu className='h-8 w-8 cursor-pointer' onClick={toggleMenu} />
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20">
          <div className="fixed top-0 right-0 h-full w-64 bg-white p-5 shadow-md z-30">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <X className="h-6 w-6 cursor-pointer" onClick={toggleMenu} />
            </div>
            <nav className="flex flex-col gap-3">
              <Link href="/" onClick={toggleMenu}>Home</Link>
              <Link href="/store" onClick={toggleMenu}>Store</Link>
              <Link href="/categories" onClick={toggleMenu}>Categories</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;