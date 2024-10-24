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
    <ScrollArea className="w-full overflow-hidden rounded-md flex px-5">
      <div className="flex space-x-5">
        {categoryList.map((category, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 2, delay: index * 0.1 }} // Delay for staggered effect
            className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-lg border shrink-0 shadow-sm cursor-pointer hover:border-[#e42584]'
          >
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
              width={200} // Adjust size as necessary
              height={200} // Adjust size as necessary
              alt='Slider Image'
              className='h-[200px] w-[200px] object-contain rounded-t-lg'
            />
            <div className='w-full bg-[#e42584] rounded-b-lg'>
              <h2 className='m-2 text-sm text-center text-white'>{category?.Name}</h2>
            </div>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default CategoryList
