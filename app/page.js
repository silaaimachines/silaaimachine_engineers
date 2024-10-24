"use client";

import { useEffect, useState } from 'react';
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import BrandsSlider from './_components/BrandsSlider';
import CategoryList from './_components/CategoryList';
import FeaturedProducts from'./_components/FeaturedProducts';
import Customertype from './_components/Customertype';
import banner_1 from './public/banner/banner.webp';
import Image from 'next/image';

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [featuredProductsList, setFeaturedProductsList]=useState([]);
  const [customerTypeList, setCustomerTypeList]=useState([]);


  useEffect(() => {
    getSliders();
    getBrandSliders();
    getCategories();
    getFeaturedProductList();
    getCustomerTypeList();
  }, []);

  const getSliders = () => {
    GlobalApi.getSliders().then(res => {
      setSliderList(res.data.data);
    })
  }

  const getBrandSliders = () => {
    GlobalApi.getBrandSliders().then(res => {
      setBrandSliderList(res.data.data);
    })
  }

  const getCategories = () => {
    GlobalApi.getCategory().then(res => {
      setCategoryList(res.data.data);
    })
  }

  const getFeaturedProductList = () => {
    GlobalApi.getProducts().then(res => {
      setFeaturedProductsList(res.data.data);
    })
  }
  const getCustomerTypeList=()=>{
    GlobalApi.getCustomerType().then(res=>{
      setCustomerTypeList(res.data.data);
    })
  }


  return (
    <div className='px-5'>
      <div>
        <Slider sliderList={sliderList} />
      </div>
      <div>
        <BrandsSlider brandSliderList={brandSliderList} />
      </div>
      <div className='py-2 lg:px-10 md:px-2 sm:px-1'>
        <CategoryList categoryList={categoryList} />
      </div>
      <div className='py-5 lg:px-10 md:px-2 sm:px-1'>
        <Image
          src={banner_1} width={1000} height={500} alt='banner'
          className='w-full h-auto'/>
      </div>
      <div className='py-2 px-10'>
        <FeaturedProducts featuredProductsList={featuredProductsList} />
      </div>
      <div className='py-2 px-2'>
        <Customertype customerTypeList={customerTypeList}/>
      </div>

    </div>
  );
};

export default Home;