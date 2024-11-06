"use client";

import { useEffect, useState } from 'react';
import Slider from './_components/Slider';
import GlobalApi from './_utils/GlobalApi';
import BrandsSlider from './_components/BrandsSlider';
import CategoryList from './_components/CategoryList';
import FeaturedProducts from './_components/FeaturedProducts';
import Customertype from './_components/Customertype';
import Image from 'next/image';
const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [featuredProductsList, setFeaturedProductsList] = useState([]);
  const [customerTypeList, setCustomerTypeList] = useState([]);

  useEffect(() => {
    getSliders();
    getBrandSliders();
    getCategories();
    getFeaturedProductList();
    getCustomerTypeList();
  }, []);

  const getSliders = () => {
    GlobalApi.getAllSliders().then(res => {
      setSliderList(res);
    });
  };

  const getBrandSliders = () => {
    GlobalApi.getAllBrandSliders().then(res => {
      setBrandSliderList(res);
    });
  };

  const getCategories = () => {
    GlobalApi.getAllCategories().then(res => {
      setCategoryList(res);
    });
  };

  const getFeaturedProductList = () => {
    GlobalApi.getAllFeaturedProducts().then(res => {
      setFeaturedProductsList(res);
    });
  };

  const getCustomerTypeList = () => {
    GlobalApi.getAllCustomerTypes().then(res => {
      setCustomerTypeList(res);
    });
  };

  return (
    <div>
      {/* Main Page Content */}
      <div>
        <Slider sliderList={sliderList} />
      </div>

      <div className='flex justify-center'>
        <BrandsSlider brandSliderList={brandSliderList} />
      </div>

      <div className='px-2'>
        <div className='py-2 lg:px-10 md:px-2 sm:px-1'>
          <FeaturedProducts featuredProductsList={featuredProductsList} />
        </div>

        <div className='py-2 lg:px-10 md:px-2 sm:px-1'>
          <Customertype customerTypeList={customerTypeList} />
        </div>

        <div className='py-2 lg:px-10 md:px-2 sm:px-1'>
          <CategoryList categoryList={categoryList} />
        </div>
      </div>
    </div>
  );
};

export default Home;