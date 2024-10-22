"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import siteIcon from '../public/images/02.png';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Menu, PhoneCall, Search, X } from 'lucide-react';
import GlobalApi from '../_utils/GlobalApi';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory().then(res => {
      setCategoryList(res.data.data);
    });
  };

  return (
    <header className='px-5'>
      {/* Desktop View */}
      <div className='hidden md:flex justify-between items-center p-3'>
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

      {/* Mobile View */}
      <div className='md:hidden flex justify-between items-center p-3'>
        <Image src={siteIcon} alt='logo' width={150} height={150} />
        <Menu onClick={toggleDrawer} className="cursor-pointer" />
      </div>

      {/* Mobile Drawer with modern styling */}
      {isDrawerOpen && (
        <div>
          <div className='fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm' onClick={toggleDrawer} />

          <div className={`fixed top-0 left-0 h-full w-3/4 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="p-6">
              <div className="flex justify-end items-center mb-6">
                <X className="h-6 w-6 cursor-pointer" onClick={toggleDrawer} />
              </div>
              <nav className="flex flex-col gap-6">
                <div className='flex gap-3 items-center border rounded-full p-2 justify-between'>
                  <input type='text' placeholder='Search' className='outline-none px-3 w-full' />
                  <Search className='h-5 w-5' />
                </div>

                {/* Nav items with separator */}
                <div className='mt-4'>
                  <Link href="/" onClick={toggleDrawer} className="transition-colors duration-300">
                    Home
                  </Link>
                  <hr className="border-gray-300 my-2" /> {/* Separator */}
                  {categoryList.map((category, index) => (
                    <div key={index}>
                      <h2 className="transition-colors duration-300 hover:text-gray-700">{category?.Name}</h2>
                      <hr className="border-gray-300 my-2" /> {/* Separator */}
                    </div>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;