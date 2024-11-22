"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, PhoneCall, Menu, User } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../_components/ThemeToggle";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import GlobalApi from "../_utils/GlobalApi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/search_input";

const Header = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const getCategories = () => {
    GlobalApi.getAllCategories().then((res) => {
      setCategoryList(res);
    });
  };

  const getBrands = () => {
    GlobalApi.getAllBrandSliders().then((res) => {
      setBrandList(res);
    });
  };

  useEffect(() => {
    setMounted(true);
    getCategories();
    getBrands();
  }, []);

  const groupedCategories = categoryList.reduce((acc, category) => {
    const mainCategory = category.MainCategory;
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    acc[mainCategory].push(category);
    return acc;
  }, {});

  // Scroll event listener to toggle header visibility based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShowHeader(false); // Hide on scroll down
      } else {
        setShowHeader(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (!mounted) return null;

  return (
    <>
      {/* Main sticky header that appears only when scrolling up */}
      <div
        className={`sticky top-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } backdrop-blur-2xl`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:flex justify-between items-center p-3 px-5 shadow-sm">
          <div>
            <Link href="/">
              {theme === "dark" ? (
                <Image
                  unoptimized
                  src="/Silaaimachine Engineers White.webp"
                  alt="logo"
                  width={200}
                  height={200}
                />
              ) : (
                <Image
                  unoptimized
                  src="/Silaaimachine Engineers Black.webp"
                  alt="logo"
                  width={200}
                  height={200}
                />
              )}
            </Link>
          </div>

          <div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/store" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Store
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {/* Brand Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-2 px-5 md:w-[400px] lg:w-[500px]">
                      {brandList.map((brand) => (
                        <li key={brand.id}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/brand/${brand.slug}`}
                              className="block p-2 rounded-md hover:bg-theme_color hover:text-white"
                            >
                              {brand.Name}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Category Menu */}
                {Object.entries(groupedCategories).map(
                  ([mainCategory, subCategories]) => (
                    <NavigationMenuItem key={mainCategory}>
                      <NavigationMenuTrigger>
                        {mainCategory}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="p-2 px-5 md:w-[400px] lg:w-[500px]">
                          {subCategories.map((category) => (
                            <li key={category.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={`/category/${category.slug}`}
                                  className="block p-2 rounded-md hover:bg-theme_color hover:text-white"
                                >
                                  {category.Name}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-5 items-center">
            <div className="flex justify-center items-center gap-2 border border-black dark:border-white rounded-md px-2">
              <Input
                placeholder="Search..."
                className="w-full px-2"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Link href={`/search/${searchQuery}`} passHref>
                <Search className="h-5 w-5 dark:text-white  text-black cursor-pointer" />
              </Link>
            </div>
            <Button asChild>
              <Link href="/login">
                <User />
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div
        className={`lg:hidden flex flex-col justify-between items-center p-3 px-5 shadow-sm backdrop-blur-xl sticky top-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="w-full flex justify-between items-center">
          <Link href="/">
            {theme === "dark" ? (
              <Image
                unoptimized
                src="/Silaaimachine Engineers White.webp"
                alt="logo"
                width={100}
                height={100}
              />
            ) : (
              <Image
                unoptimized
                src="/Silaaimachine Engineers Black.webp"
                alt="logo"
                width={100}
                height={100}
              />
            )}
          </Link>

          {/* Mobile Menu Drawer using Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-8 w-8 cursor-pointer" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] max-h-screen overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4">
                {/* Home and Store Links */}
                <div className="mb-3">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="block p-2 rounded-md hover:bg-theme_color hover:text-white"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/store"
                      className="block p-2 rounded-md hover:bg-theme_color hover:text-white"
                    >
                      Store
                    </Link>
                  </SheetClose>
                </div>

                {/* Accordion for Dynamic Sections */}
                <Accordion type="single" collapsible className="w-full">
                  {/* Brands Section */}
                  <AccordionItem value="brands">
                    <AccordionTrigger>Brands</AccordionTrigger>
                    <AccordionContent>
                      <ul className="ml-4 list-disc">
                        {brandList.map((brand) => (
                          <li key={brand.id} className="p-1">
                            <SheetClose asChild>
                              <Link
                                href={`/brand/${brand.slug}`}
                                className="hover:underline truncate"
                              >
                                {brand.Name}
                              </Link>
                            </SheetClose>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Categories Section */}
                  {Object.entries(groupedCategories).map(
                    ([mainCategory, subCategories]) => (
                      <AccordionItem key={mainCategory} value={mainCategory}>
                        <AccordionTrigger>{mainCategory}</AccordionTrigger>
                        <AccordionContent>
                          <ul className="ml-4 list-disc">
                            {subCategories.map((category) => (
                              <li key={category.id} className="p-1">
                                <SheetClose asChild>
                                  <Link
                                    href={`/category/${category.slug}`}
                                    className="hover:underline truncate"
                                  >
                                    {category.Name}
                                  </Link>
                                </SheetClose>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </nav>

              {/* Theme Toggle */}
              <div className="mt-4 flex justify-center items-center">
                <ThemeToggle />
              </div>
              <SheetFooter />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Input (Below Top Header) */}
        <div className="flex w-full mt-3 justify-between items-center gap-2 rounded-md px-2 dark:border-black bg-white dark:bg-black">
          <Input
            placeholder="Search..."
            className="w-full px-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link href={`/search/${searchQuery}`} passHref>
            <Search className="h-5 w-5 cursor-pointer" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
