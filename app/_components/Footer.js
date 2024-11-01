import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import siteIcon from '../public/images/Silaaimachineenginner white.png';
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">

        {/* Column 1: Policies */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold text-lg mb-4">Our Policies</h2>
          <ul className="space-y-2">
            <li><Link href="/privacy-policy" className="hover:text-pink-500">Privacy Policy</Link></li>
            <li><a href="#" className="hover:text-pink-500">Terms of Service</a></li>
            <li><a href="#" className="hover:text-pink-500">Returns & Exchanges</a></li>
          </ul>
        </div>

        {/* Column 2: Logo and Slogan */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-4">
            <Image src={siteIcon} alt="logo" width={200} height={200} />
          </Link>

          <p className="text-2xl mb-4 text-gray-400 font-bold">Sales Bhi Service Bhi</p>
        </div>

        {/* Column 3: Pages */}
        <div className="text-center md:text-left">
          <h2 className="font-semibold text-lg mb-4">Our Pages</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-pink-500">Home</a></li>
            <li><a href="#" className="hover:text-pink-500">About Us</a></li>
            <li><a href="#" className="hover:text-pink-500">Services</a></li>
            <li><Link href="/contact" className="hover:text-pink-500">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Social Icons and Copyright */}
      <div className="border-t border-gray-800 mt-10">
        <div className="container mx-auto px-5 py-6 flex flex-col md:flex-row justify-between items-center">

          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left">© 2024 SilaaiMachines. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
