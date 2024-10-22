"use client";

import { useEffect, useState } from 'react';
import Slider from './_components/Slider'
import GlobalApi from './_utils/GlobalApi'
import BrandsSlider from './_components/BrandsSlider';

<<<<<<< HEAD
const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
=======
export default function Home() {

  /* const [sliderList, setSliderList] = useState([]);
>>>>>>> fd83a6a5470f6d1a3a6f2e01f3478018f1f6f85c

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
      console.log(res.data.data);
      setBrandSliderList(res.data.data);
    })
  } */

  return (
    <div>
      <div className='py-5 px-16'>
        <Slider sliderList= {sliderList}/>
      </div>
      <div className='py-5 px-16'>
        <BrandsSlider brandSliderList={brandSliderList}/>
      </div>
    </div>
  );
};

export default Home;