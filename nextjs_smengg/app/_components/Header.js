"use client";
import Image from 'next/image';
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div>
        <Image src='https://silaaimachines.com/wp-content/uploads/2024/09/Silaaimachines-Website-Logo.png' alt='logo' width={150} height={150}/>
        <Image src='/images/03.png' alt='logo' width={150} height={150}/>
        <p>Hello</p>
      </div>
    </header>
  );
};

export default Header;