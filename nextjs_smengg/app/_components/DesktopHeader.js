"use client";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Search, PhoneCall } from 'lucide-react';
import siteIcon from '../public/images/02.png';


const DesktopHeader = () => {

  return (
    <div className='hidden md:flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-10 backdrop-blur-sm'>
      <div>
        <Image src={siteIcon} alt='logo' width={200} height={200} />
      </div>

      <div className='flex gap-5 items-center' style={{ width: '35%' }}>
        <div className='flex gap-3 items-center border rounded-full p-2 justify-between w-full'>
          <input type='text' placeholder='Search' className='outline-none px-3 w-full' />
          <Search className='h-5 w-5' />
        </div>
        <Button variant="outline" as="a" href="cd nextjs_smen">
          <PhoneCall className='h-5 w-5' />Call Us
        </Button>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default DesktopHeader;
