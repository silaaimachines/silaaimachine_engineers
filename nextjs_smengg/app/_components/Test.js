import { Button } from '@/components/ui/button'
import React from 'react'

const Test = () => {
  return (
    <div className=' flex justify-center items-center bg-black h-screen'>
       <div className='relative group' >
        <div className='absolute -inset-0.5 text-black bg-gradient-to-r from-pink-400 to-purple-500
         rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000'></div>
       <Button className="relative  border-black text-white hover:text-black  ">king</Button>
       </div>
    </div>
   
  )
}

export default Test