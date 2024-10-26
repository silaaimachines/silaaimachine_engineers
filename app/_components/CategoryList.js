import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"; // Updated import path
import { motion, useInView } from 'framer-motion';

const CategoryList = ({ categoryList }) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  // Use the useInView hook to check visibility
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref}>
      <div className='flex items-center gap-2'>
        <h1 className='py-5 font-semibold text-md md:text-2xl'>Shop by</h1>
        <h1 className='font-semibold underline decoration-theme_color text-lg md:text-3xl'>Categories</h1>
      </div>
      <ScrollArea className="w-full overflow-hidden">
        <div className="flex space-x-1">
          {categoryList.map((category, index) => (
            <Link key={index} href={`/category/${category.slug}`} passHref>
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={itemVariants}
                transition={{ duration: 1, delay: index * 0.1 }}
                className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-t-lg border shrink-0 shadow-sm cursor-pointer hover:border-theme_color'
              >
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
                  width={200}
                  height={200}
                  alt='Slider Image'
                  className='object-cover rounded-t-lg w-full/2 h-[100px] md:h-[150px] lg:h-auto'
                />
                <div className='w-full bg-theme_color'>
                  <h2 className='m-1 text-center text-white text-sm'>{category?.Name}</h2>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default CategoryList;
