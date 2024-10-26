import React from 'react';
import Link from 'next/link'; // Import Link from next/link
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

const Customertype = ({ customerTypeList }) => {
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
      <div className='px-5'>
        <div className='flex items-center gap-2'>
          <h1 className='py-5 text-2xl font-semibold'>Shop by</h1>
          <h1 className='text-3xl font-semibold underline decoration-red-500'>Customer-Type</h1>
        </div>
        <ScrollArea className="w-full overflow-hidden">
          <div className="flex space-x-5">
            {customerTypeList.map((customer_type, index) => (
              <Link key={index} href={`/customer-type/${customer_type.slug}`} passHref>
                <motion.div
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={itemVariants}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-lg border shrink-0 shadow-sm cursor-pointer hover:border-[#e42584]'
                >
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + customer_type?.Image?.url}
                    width={200}
                    height={200}
                    alt='Slider Image'
                    className='h-[200px] w-[200px] object-contain rounded-t-lg'
                  />
                  <div className='w-full bg-black dark:bg-gray-700 rounded-b-lg'>
                    <h2 className='m-2 text-sm text-center text-white'>{customer_type?.Name}</h2>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Customertype;
