import { ShoppingBag } from 'lucide-react'
import React from 'react'
import Image from 'next/image'


const CategoryList = ({ categoryList }) => {
  return (
    <div>
      <h2 className='text-2xl font-bold py-2 flex items-center justify-center'>Category List</h2>


      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
        {categoryList.map((category, index) => (
          <div
            key={index}
            className='flex flex-col items-center justify-center p-4 bg-gray-100 transition duration-300 ease-in-out rounded-lg  border shadow-sm cursor-pointer hover:bg-gray-200'
          >
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
              width={350}
              height={350}
              alt='Slider Image'
              className=' h-[200px] w-[200px] object-contain'
            />
            <h2 className='mt-4 text-sm font-medium text-center'>{category?.Name}</h2>
          </div>
        ))}
      </div>




    </div>
  )
}

export default CategoryList