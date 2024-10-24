"use client";
import React, { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { motion } from 'framer-motion'; // Import Framer Motion

const Store = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.getProducts().then((res) => {
      setProductList(res.data.data);
    });
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 lg:gap-4 p-9">
      {productList.map((product, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.3, delay: index * 0.1 }} // Staggered effect for each item
          whileHover={{ scale: 1.05 }} // Add scale effect on hover
          className="relative group"
        >
          {/* Glowing background effect */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-[#6c3db8] to-[#eb3395] rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-1200"></div>

          {/* Foreground product card */}
          <div className="relative flex flex-col items-center border rounded-lg transition-all duration-300 ease-in-out bg-white dark:bg-black">
            <div className="relative z-10"> {/* Ensures the product content is on top of the glow */}
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.Images[0]?.url}
                width={400}
                height={400}
                alt={product?.Name}
                className="rounded-md h-full w-full object-contain"
              />
              <p className="mt-2 text-lg font-semibold z-10 text-center">{product?.Name}</p>
              <p className="mt-2 text-lg font-semibold z-10 text-center">₹ {product?.BasePrice}</p>
              <p className="mt-2 text-lg font-semibold z-10 text-center">₹ {product?.DiscountPrice}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Store;