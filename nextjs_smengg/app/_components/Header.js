import { Button } from '@/components/ui/button'
import { LayoutGridIcon, Search, ShoppingBag, ShoppingBagIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-2  shadow-md flex items-center justify-between'>
    <div className='flex items-center gap-1 '>
         <ShoppingBag className='h-5 w-5'/>
        <div className='flex gap-1 items-center border rounded-xl p-1  
             bg-pink-300'>
             <LayoutGridIcon/>
            <h2 className='md:flex hidden'>
              Category
            </h2>
        </div>

        <div className=' flex  gap-1 items-center   border rounded-xl p-1 px-1 '>
            <input type='text' placeholder='Search'
            className='outline-none'/>

        </div>
        <div>
        <Search/>
        </div>
    </div>
    <div className='flex items-center gap-1'>
       <ShoppingBagIcon/>
        <Button>Login</Button>
       
    </div>
    </div>
  )
}

export default Header