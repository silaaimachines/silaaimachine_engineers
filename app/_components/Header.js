"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, PhoneCall, Menu } from 'lucide-react';
import Link from 'next/link';
import ThemeToggle from '../_components/ThemeToggle';
import { useTheme } from 'next-themes';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";

import GlobalApi from '../_utils/GlobalApi';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";

const Header = () => {
  const { theme } = useTheme(); // Get the current theme (light or dark)
  const [mounted, setMounted] = useState(false); // Mounted state for hydration

  useEffect(() => {
    setMounted(true); // Set mounted to true after component mounts
  }, []);

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    GlobalApi.getAllCategories().then(res => {
      setCategoryList(res);
    });
  };

  // Group categories by Main Category
  const groupedCategories = categoryList.reduce((acc, category) => {
    const mainCategory = category.MainCategory;
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    acc[mainCategory].push(category);
    return acc;
  }, {});

  // Ensure the component renders only after mounting to avoid hydration issues
  if (!mounted) return null;

  return (
    <>
      {/* Desktop Navbar */}
      <div className='hidden md:flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-50 bg-white dark:bg-black'>
        <div>
          <Link href="/">
            {theme === 'dark' ? (
              <Image src='/Silaaimachine Engineers White.svg' alt='logo' width={200} height={200} />
            ) : (
              <Image src='/Silaaimachine Engineers Black.svg' alt='logo' width={200} height={200} />
            )}
          </Link>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem> 
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem> 
              <Link href="/store" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Store</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {Object.entries(groupedCategories).map(([mainCategory, subCategories]) => (
              <NavigationMenuItem key={mainCategory}>
                <NavigationMenuTrigger>{mainCategory}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                    {subCategories.map((category) => (
                      <li key={category.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`/category/${category.slug}`}
                            className="block p-3 rounded-md hover:bg-gray-200"
                          >
                            {category.Name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className='flex gap-5 items-center'>
          <Search className='h-5 w-5' />
          <Button variant="outline" as="a" href="cd nextjs_smen">
            <PhoneCall className='h-5 w-5' /> Call Us
          </Button>
          <Button asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className='md:hidden flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-50 bg-white dark:bg-black'>
        <div>
          <Link href="/">
            {theme === 'dark' ? (
              <Image src='/Silaaimachine Engineers White.svg' alt='logo' width={100} height={100} />
            ) : (
              <Image src='/Silaaimachine Engineers Black.svg' alt='logo' width={100} height={100} />
            )}
          </Link>
        </div>

        {/* Mobile Menu Drawer using Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Menu className='h-8 w-8 cursor-pointer' />
          </SheetTrigger>
          <SheetContent side="right" className="w-64 max-h-screen overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-3 mt-4">
              <Link href="/">Home</Link>
              <Link href="/store">Store</Link>
              {Object.entries(groupedCategories).map(([mainCategory, subCategories]) => (
                <div key={mainCategory}>
                  <h3 className="font-semibold mt-3">{mainCategory}</h3>
                  <ul className="ml-4">
                    {subCategories.map((category) => (
                      <li key={category.id}>
                        <Link href={`/category/${category.slug}`}>
                          {category.Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <ThemeToggle />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default Header;