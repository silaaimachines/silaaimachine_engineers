"use client";

import { useEffect, useState } from 'react';
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import BrandsSlider from './_components/BrandsSlider';

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);

  useEffect(() => {
    getSliders();
    getBrandSliders();
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

  return (
    <div className='py-4'>
      <div className='py-5 px-2'>
        <Slider sliderList= {sliderList}/>
      </div>
      <div className='py-2 px-2'>
        <BrandsSlider brandSliderList={brandSliderList}/>
      </div>
    </div>
  );
};

export default Home;