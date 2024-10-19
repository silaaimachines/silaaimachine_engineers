import { ShoppingBag } from 'lucide-react'
import { LayoutGrid,Search, ShoppingBagIcon} from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className='p-2 px-10 shadow-md flex items-center justify-between'>
    <div className='flex items-center gap-6 '>
         <ShoppingBag className='h-5 w-5'/>
        <div className='flex gap-2 items-center border rounded-full p-2 px-10
             bg-pink-300'>
                <LayoutGrid className='h-5 w-5'/>
            <h2 className='md:flex hidden'>Category
            </h2>
        </div>

        <div className=' flex  gap-3 items-center   border rounded-full p-1 px-1 '>
            <Search/>
            
            <input type='text' placeholder='Search'
            className='outline-none'/>

        </div>
    </div>
    <div className='flex items-center gap-1'>
    
        <ShoppingBagIcon/>
      {/*   <Button>login</Button> */}

    </div>
    </div>
  )
}

export default Header