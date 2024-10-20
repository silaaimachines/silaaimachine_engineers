<<<<<<< HEAD
import { Button } from '@/components/ui/button'
import { LayoutGridIcon, Search, ShoppingBag, ShoppingBagIcon } from 'lucide-react'
=======
import { ShoppingBag } from 'lucide-react'
import { LayoutGrid,Search, ShoppingBagIcon} from 'lucide-react'
>>>>>>> 9662097936a308e3688bcf592087c23a3c0c26a8
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

<<<<<<< HEAD
        <div className=' flex  gap-1 items-center   border rounded-xl p-1 px-1 '>
=======
        <div className=' flex  gap-3 items-center   border rounded-full p-1 px-1 '>
            <Search/>
            
>>>>>>> 9662097936a308e3688bcf592087c23a3c0c26a8
            <input type='text' placeholder='Search'
            className='outline-none'/>

        </div>
        <div>
        <Search/>
        </div>
    </div>
    <div className='flex items-center gap-1'>
<<<<<<< HEAD
       <ShoppingBagIcon/>
        <Button>Login</Button>
       
=======
    
        <ShoppingBagIcon/>
      {/*   <Button>login</Button> */}

>>>>>>> 9662097936a308e3688bcf592087c23a3c0c26a8
    </div>
    </div>
  )
}

export default Header