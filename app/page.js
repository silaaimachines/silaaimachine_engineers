"use client";

import { useEffect, useState } from 'react';
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import BrandsSlider from './_components/BrandsSlider';
import CategoryList from './_components/CategoryList';

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getSliders();
    getBrandSliders();
    getCategories();
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

  return (
    <div>
      <div className=' px-2'>
        <Slider sliderList={sliderList} />
      </div>
      <div className='py-2 lg:px-10 md:px-5 sm:px-2'>
        <CategoryList categoryList={categoryList} />
      </div>
      <div className='py-2 px-2'>
        <BrandsSlider brandSliderList={brandSliderList} />
      </div>

    </div>
  );
};

export default Home;