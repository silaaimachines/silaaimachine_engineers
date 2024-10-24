import React from 'react'
import Image from 'next/image'
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { motion } from 'framer-motion'

const CategoryList = ({ categoryList }) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div>
      <div className='flex items-center gap-1'>
      <h1 className='py-5 font-semibold text-md md:text-2xl'>Shop by</h1>
      <h1 className='font-semibold underline decoration-theme_color text-lg md:text-3xl'>Categories</h1>
      </div>
      <ScrollArea className="w-full overflow-hidden">
        <div className="flex space-x-5">
          {categoryList.map((category, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 2, delay: index * 0.1 }} // Delay for staggered effect
              className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-t-lg border shrink-0 shadow-sm cursor-pointer hover:border-theme_color'
            >
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
                width={200} // Adjust size as necessary
                height={200} // Adjust size as necessary
                alt='Slider Image'
                className='object-contain rounded-t-lg h-auto w-full/2'
              />
              <div className='w-full bg-theme_color'>
                <h2 className='m-2 text-center text-white text-sm md:text-'>{category?.Name}</h2>
              </div>
            </motion.div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default CategoryList
