"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Store = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    getProductList(page);
  }, [page]);

  const getProductList = (currentPage) => {
    setLoading(true);
    GlobalApi.getProducts(currentPage)
      .then((res) => {
        setProductList((prevList) => [...prevList, ...res.data.data]);
        if (res.data.meta && res.data.meta.pagination) {
          setTotalPages(res.data.meta.pagination.pageCount);
        }
      })
      .finally(() => setLoading(false));
  };

  const lastProductRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, page, totalPages]);

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  const calculateDiscountPercentage = (basePrice, discountPrice) => {
    if (!basePrice || !discountPrice) return 0;
    return Math.round(((basePrice - discountPrice) / basePrice) * 100);
  };

  return (
    <div className="p-9">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-5 lg:gap-4">
        {productList.map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images } = product;
          const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);
          const isLastProduct = index === productList.length - 1;

          return (
            <motion.div
              key={index}
              ref={isLastProduct ? lastProductRef : null} // Set ref to last product for observer
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#6c3db8] to-[#eb3395] rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center border rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black shadow-sm cursor-pointer">
                <div className="relative z-10">
                  <div className="relative">
                    {Images && Images[0]?.url && (
                      <Image
                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                        width={400}
                        height={400}
                        alt={Name}
                        className="rounded-t-2xl h-full w-full object-contain"
                      />
                    )}
                    {DiscountPrice && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {discountPercentage}% off
                      </div>
                    )}
                  </div>
                  <div className='rounded-b-2xl w-full'>
                    <h2 className='text-center text-white text-sm bg-theme_color p-1'>{Name}</h2>
                    <div className="text-center flex items-center justify-center gap-1 m-2">
                      {DiscountPrice ? (
                        <>
                          <p className="text-lg font-semibold text-center">
                            ₹ {DiscountPrice}
                          </p>
                          <p className="text-sm line-through text-gray-500">
                            ₹ {BasePrice}
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
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default Store;
