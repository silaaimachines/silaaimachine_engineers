import React from 'react';
import { motion, useInView } from 'framer-motion'; // Added useInView for lazy animations
import Image from 'next/image'; // Assuming you're using Next.js Image component
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"; // Updated import path

const Customertype = ({ customerTypeList }) => {
  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  // Use the useInView hook to check visibility
  const ref = React.useRef(null);
  const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 }); // Animation triggers once, when 20% of the element is visible

  return (
    <div ref={ref}> {/* Apply the ref to the wrapper div */}
      <div className='px-5'>
        <div className='flex items-center gap-2'>
          <h1 className='py-5 text-2xl font-semibold'>Shop by</h1>
          <h1 className='text-3xl font-semibold underline decoration-red-500'>Customer-Type</h1>
        </div>
        <ScrollArea className="w-full overflow-hidden">
          <div className="flex space-x-5">
            {customerTypeList.map((customer_type, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"} // Animation only triggers when in view
                variants={itemVariants}
                transition={{ duration: 1, delay: index * 0.1 }} // Delay for staggered effect
                className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-lg border shrink-0 shadow-sm cursor-pointer hover:border-[#e42584]'
              >
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + customer_type?.Image?.url}
                  width={200} // Adjust size as necessary
                  height={200} // Adjust size as necessary
                  alt='Slider Image'
                  className='h-[200px] w-[200px] object-contain rounded-t-lg'
                />
                <div className='w-full bg-[#e42584] rounded-b-lg'>
                  <h2 className='m-2 text-sm text-center text-white'>{customer_type?.Name}</h2>
                </div>
              </motion.div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Customertype;
