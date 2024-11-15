import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {/* Column 1: Policies */}
        <div className="text-center">
          <h2 className="font-semibold text-lg mb-4">Our Pages</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-pink-500">
                Home
              </Link>
            </li>
            {/*  <li>
              <Link href="#" className="hover:text-pink-500">
                About Us
              </Link>
            </li> */}
            {/* <li>
              <Link href="#" className="hover:text-pink-500">
                Services
              </Link>
            </li> */}
            <li>
              <Link href="/contact-us" className="hover:text-pink-500">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 2: Logo and Slogan */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center">
            <Image
              unoptimized
              src="/Silaaimachine Engineers White.webp"
              alt="logo"
              width={200}
              height={200}
              className="w-[250px] md:w-[300px]"
            />
          </Link>
        </div>

        {/* Column 3: Pages */}
        <div className="text-center">
          <h2 className="font-semibold text-lg mb-4">Our Policies</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy" className="hover:text-pink-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="hover:text-pink-500">
                Terms of Service
              </Link>
            </li>
            {/*  <li>
              <Link href="#" className="hover:text-pink-500">
                Returns & Exchanges
              </Link>
            </li> */}
          </ul>
        </div>
      </div>

      {/* Bottom Section: Social Icons and Copyright */}
      <div className="border-t border-gray-800 mt-10">
        <div className="container mx-auto px-5 py-6 flex-col md:flex-row justify-center items-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center py-3">
            © 2024 Silaaimachine Engineers. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 justify-center items-center py-3">
            <Link href="#" className="text-gray-400 hover:text-pink-500">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-500">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-500">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-pink-500">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
