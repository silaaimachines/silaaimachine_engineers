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
    <div className='grid grid-cols-4'>
      {productList.map((product, index) => (
        <div key={index}>
          <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product?.Images[0]?.url} 
          width={500}
          height={500}/>
          <p>{product?.Name}</p>
        </div>
      ))}
    </div>
  )
}

export default Store