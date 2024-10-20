"use client"
import { Button } from '@/components/ui/button'
import { NavButton } from '@/components/ui/navbar'
import Link from 'next/link'
import React from 'react'


const Navbar = () => {
    const defaultfunction = () => {
        console.log('hello i am here'); // Corrected to console.log
      };
  return (
    <div className='flex justify-end gap-0 items-center rigth-0'>
      {/* <Button asChild={true} onClick={(e) => handleClick()}>
                    login
                  </Button> */}

        <NavButton className ='bg-pink-400 hover:bg-pink-300 rounded-bl-xl'onClick={(e)=>defaultfunction()}>
        <Link href='/'> Home  </Link>
        </NavButton>

        <NavButton className ='bg-pink-400  hover:bg-pink-300'  onClick={(e)=>defaultfunction()}>
            <Link href='/discover'> Discover  </Link>
              </NavButton>

        <NavButton className ='bg-pink-400  hover:bg-pink-300' onClick={(e)=>defaultfunction()}>
        <Link href='/orders'> orders  </Link>
        </NavButton>

        <NavButton className ='bg-pink-400  hover:bg-pink-300' onClick={(e)=>defaultfunction()}>
        <Link href='/profile'> profile  </Link>
        </NavButton>
    </div>
  )
}

export default Navbar