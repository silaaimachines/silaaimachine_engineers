<<<<<<< HEAD:nextjs_smengg/app/components/Header.js
import { ShoppingBag } from 'lucide-react'
import { LayoutGrid,Search, ShoppingBagIcon} from 'lucide-react'
=======
import { Search, ShoppingBag, ShoppingBagIcon } from 'lucide-react'
>>>>>>> 4065198ea532d258c3492a3203f0a0d042b17f9e:nextjs_smengg/app/_components/Header.js
import React from 'react'

const Header = () => {
  return (
    <div className='p-2 px-10 shadow-md flex items-center justify-between'>
    <div className='flex items-center gap-6 '>
         <ShoppingBag className='h-5 w-5'/>
        <div className='flex gap-2 items-center border rounded-full p-2 px-10
             bg-pink-300'>
             
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
<<<<<<< HEAD:nextjs_smengg/app/components/Header.js
      {/*   <Button>login</Button> */}

=======
>>>>>>> 4065198ea532d258c3492a3203f0a0d042b17f9e:nextjs_smengg/app/_components/Header.js
    </div>
    </div>
  )
}

export default Header