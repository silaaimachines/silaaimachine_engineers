"use client";
import { useState } from 'react';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div>
        Hello
      </div>
    </header>
  );
};

export default Header;