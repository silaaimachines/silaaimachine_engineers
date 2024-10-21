"use client";
import Image from 'next/image';
import siteIcon from '../public/images/02.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {Menu, PhoneCall, Search } from 'lucide-react';

const Header = () => {

  return (
    <header className='flex justify-between items-center p-3 px-5'>
      <div>
        <Image src={siteIcon} alt='logo' width={200} height={200} />
      </div>

      <div className='gap-5 flex items-center'>
        <Link href='/'>Home</Link>
        <Link href='/discover'>Store</Link>
        <Link href='/orders'>Sewing Machine</Link>
        <Link href='/profile'>Spare Parts</Link>
      </div>

      <div className='flex gap-5 items-center'>
        <div className='flex gap-3 items-center border rounded-full p-2'>
        <input type='text' placeholder='Search' className='outline-none px-3' />
          <Search className='h-5 w-5' />
        </div>
        <Button variant="outline"><PhoneCall className='h-5 w-5' />Call Us</Button>
        <Button>Login</Button>
        <Menu/>
      </div>
    </header>
  );
};

export default Header;