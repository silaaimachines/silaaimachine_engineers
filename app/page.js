"use client";

import { useEffect, useState } from "react";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import BrandsSlider from "./_components/BrandsSlider";

import FeaturedProducts from "./_components/FeaturedProducts";
import Customertype from "./_components/Customertype";
import Image from "next/image";
const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
  const [featuredProductsList, setFeaturedProductsList] = useState([]);
  const [customerTypeList, setCustomerTypeList] = useState([]);

  useEffect(() => {
    getSliders();
    getBrandSliders();
    getFeaturedProductList();
    getCustomerTypeList();
  }, []);

  const getSliders = () => {
    GlobalApi.getAllSliders().then((res) => {
      setSliderList(res);
    });
  };

  const getBrandSliders = () => {
    GlobalApi.getAllBrandSliders().then((res) => {
      setBrandSliderList(res);
    });
  };

  const getFeaturedProductList = () => {
    GlobalApi.getAllFeaturedProducts().then((res) => {
      setFeaturedProductsList(res);
    });
  };

  const getCustomerTypeList = () => {
    GlobalApi.getAllCustomerTypes().then((res) => {
      setCustomerTypeList(res);
    });
  };

  return (
    <div>
      {/* Main Page Content */}
      <div>
        <Slider sliderList={sliderList} />
      </div>

      <div className=" relative lg:-top-12 flex justify-center backdrop-blur-lg">
        <BrandsSlider brandSliderList={brandSliderList} />
      </div>

      <div>
        <div className="lg:px-10 md:px-2 sm:px-1">
          <FeaturedProducts featuredProductsList={featuredProductsList} />
        </div>

        <div className="py-2 lg:px-10 md:px-2 sm:px-1">
          <Customertype customerTypeList={customerTypeList} />
        </div>
      </div>
    </div>
  );
};

export default Home;
