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

  // Helper function to calculate discount percentage
  const calculateDiscountPercentage = (basePrice, discountPrice) => {
    if (!basePrice || !discountPrice) return 0;
    return Math.round(((basePrice - discountPrice) / basePrice) * 100);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 lg:gap-4 p-9">
      {productList.map((product, index) => {
        const { BasePrice, DiscountPrice, Name, Images } = product;
        const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

        return (
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
                {Images && Images[0]?.url && (
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                    width={400}
                    height={400}
                    alt={Name}
                    className="rounded-md h-full w-full object-contain"
                  />
                )}

                <p className="mt-2 text-lg font-semibold z-10 text-center">{Name}</p>

                <div className="text-center flex items-center justify-center gap-1">
                  {DiscountPrice ? (
                    <>
                      <p className="text-lg font-semibold text-center ">
                        ₹ {DiscountPrice}
                      </p>
                      <p className="text-sm line-through text-gray-500">
                        ₹ {BasePrice}
                      </p>
                      <p className="text-sm text-green-500">
                        {discountPercentage}% off
                      </p>
                    </>
                  ) : (
                    <p className="text-lg font-semibold text-center">
                      ₹ {BasePrice}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Store;
