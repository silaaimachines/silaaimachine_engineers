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
import { Input } from '@/components/ui/input';

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input

  useEffect(() => {
    setMounted(true);
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
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-50 bg-white dark:bg-black">
        <div>
          <Link href="/">
            {theme === 'dark' ? (
              <Image src='/Silaaimachine Engineers White.svg' alt='logo' width={200} height={200} />
            ) : (
              <Image src='/Silaaimachine Engineers Black.svg' alt='logo' width={200} height={200} />
            )}
          </Link>
        </div>

        <div className="flex gap-5 items-center">
          {/* Search input with Link */}
          <div className="flex justify-center items-center gap-2 border rounded-md px-2">
            <Input
              placeholder="Search..."
              className="w-full px-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
            />
            <Link href={`/search/${searchQuery}`} passHref>
              <Search className="h-5 w-5 text-gray-500 cursor-pointer" />
            </Link>
          </div>

          <Button variant="outline" as="a" href="cd nextjs_smen">
            <PhoneCall className="h-5 w-5" /> Call Us
          </Button>
          <Button asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Navigation Menu (Below Header) */}
      <div className="hidden md:flex justify-center shadow-sm sticky top-0 z-40 bg-white dark:bg-black">
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
                            className="block p-3 rounded-md hover:bg-theme_color hover:text-white"
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
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex flex-col justify-between items-center p-3 px-5 shadow-sm sticky top-0 z-50 bg-white dark:bg-black">
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            {theme === 'dark' ? (
              <Image src='/Silaaimachine Engineers White.svg' alt='logo' width={100} height={100} />
            ) : (
              <Image src='/Silaaimachine Engineers Black.svg' alt='logo' width={100} height={100} />
            )}
          </Link>

          {/* Mobile Menu Drawer using Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-8 w-8 cursor-pointer" />
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

        {/* Search Input (Below Top Header) */}
        <div className="flex w-full mt-3 items-center gap-2 border rounded-md px-2">
          <Input
            placeholder="Search..."
            className="w-full px-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          />
          <Link href={`/search/${searchQuery}`} passHref>
            <Search className="h-5 w-5 text-gray-500 cursor-pointer" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
