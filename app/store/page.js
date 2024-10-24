"use client";
import { get } from 'http';
import React from 'react'
import { useEffect, useState } from 'react';
import GlobalApi from '../_utils/GlobalApi';
import Image from 'next/image';


const Store = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProductList();
  }, []);

  const getProductList = () => {
    GlobalApi.getProducts().then(res => {
      setProductList(res.data.data);
    })
  }


  return (



    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-4 p-4">
      {productList.map((product, index) => (

        <div className='relative group'>
          <div className='absolute -inset-3 text-black bg-gradient-to-tr from-[#6c3db8] to-[#eb3395]
         rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000'></div>
          <div
            key={index}

            className="flex flex-col items-center border shadow-lg rounded-lg 
        p-4 hover:scale-105 transform transition-all duration-300 ease-in-out bg-white dark:bg-black"
          >
            <div className='relative'>
            <Image
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.Images[0]?.url}
              width={400}
              height={400}
              alt={product?.Name}
              className="rounded-md h-[200px] w-[200px] object-contain "
            />
            <p className="mt-2 text-lg font-semibold z-10 text-center">{product?.Name}</p>
            <p className="mt-2 text-lg font-semibold z-10 text-center">₹ {product?.BasePrice}</p>
            <p className="mt-2 text-lg font-semibold z-10 text-center">₹ {product?.DiscountPrice}</p>
            </div>
          </div>
        </div>

      ))}
    </div>



  )
}

export default Store