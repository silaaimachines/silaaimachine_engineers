"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';


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
    <div className="p-3 md:p-5">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-3 md:gap-4 lg:gap-6 py-2 md:py-5">
        {productList.map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images,slug } = product;
          const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);
          const isLastProduct = index === productList.length - 1;

          return (
            <Link key={index} href={`/product/${slug}`} passHref>
            <motion.div
              key={index}
              ref={isLastProduct ? lastProductRef : null} // Set ref to last product for observer
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.1, delay: index * 0.05 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-theme_color rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative flex flex-col items-center justify-center border border-gray-300 rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black shadow-sm cursor-pointer">
                <div className="relative z-10">
                  <div className="relative">
                    {Images && Images[0]?.url && (
                      <Image
                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                        width={400}
                        height={400}
                        alt={Name}
                        className="rounded-t-2xl h-full w-full object-contain p-3"
                      />
                    )}
                    {DiscountPrice && (
                      <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        {discountPercentage}% off
                      </div>
                    )}
                  </div>
                  <div className='rounded-b-2xl w-full'>
                    <h2 className='text-xs md:text-sm px-3 py-2'>{Name}</h2>
                    <div className="text-center flex items-center justify-center gap-3 text-white text-xs md:text-sm bg-black dark:bg-gray-700 py-2 rounded-b-2xl">
                      {DiscountPrice ? (
                        <>
                          <p className="text-sm font-semibold">
                            ₹ {DiscountPrice}
                          </p>
                          <p className="text-xs line-through text-gray-300">
                            ₹ {BasePrice}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-semibold text-center">
                          ₹ {BasePrice}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            </Link>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default Store;
