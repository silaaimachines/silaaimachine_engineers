"use client";

import { useEffect, useState } from "react";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import BrandsSlider from "./_components/BrandsSlider";

import FeaturedProducts from "./_components/FeaturedProducts";
import Customertype from "./_components/Customertype";
import Image from "next/image";
import NewArrivals from "./_components/NewArrivals";

const Home = () => {
  const [sliderList, setSliderList] = useState([]);
  const [brandSliderList, setBrandSliderList] = useState([]);
  const [AllProductsList, setAllProductsList] = useState([]);
  const [customerTypeList, setCustomerTypeList] = useState([]);
  const [featuredProductsList, setFeaturedProductsList] = useState([]);
  const [banner1, setBanner1] = useState(null);
  const [banner2, setBanner2] = useState(null);

  useEffect(() => {
    getSliders();
    getBrandSliders();
    getFeaturedProductList();
    getCustomerTypeList();
    getAllProductsList();
    getBanner1();
    getBanner2();
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

  const getAllProductsList = () => {
    GlobalApi.getAllProducts().then((res) => {
      setAllProductsList(res);
    });
  };

  const getBanner1 = () => {
    GlobalApi.getBannerByName("Banner1").then((res) => {
      const banner = res.data?.data?.[0];
      setBanner1(banner);
    });
  };

  const getBanner2 = () => {
    GlobalApi.getBannerByName("Banner2").then((res) => {
      const banner = res.data?.data?.[0];
      setBanner2(banner);
    });
  };

  return (
    <div>
      {/* Main Page Content */}
      <div>
        <Slider sliderList={sliderList} />
      </div>

      <div className="relative lg:-top-12 flex justify-center backdrop-blur-lg">
        <BrandsSlider brandSliderList={brandSliderList} />
      </div>

      <div className="lg:px-10 md:px-2 sm:px-1">
        <FeaturedProducts featuredProductsList={featuredProductsList} />
      </div>

      {banner1 && (
        <div className="py-2 lg:px-10 md:px-2 sm:px-1">
          <Image
            unoptimized
            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + banner1?.Image?.url}
            width={1000}
            height={1000}
            alt={banner1?.Name}
            className="w-full h-auto"
          />
        </div>
      )}

      <div className="py-2 lg:px-10 md:px-2 sm:px-1">
        <Customertype customerTypeList={customerTypeList} />
      </div>

      <div className="py-2 lg:px-10 md:px-2 sm:px-1">
        <NewArrivals AllProductsList={AllProductsList} />
      </div>

      <div>
        {banner2 && (
          <div className="py-2 lg:px-10 md:px-2 sm:px-1">
            <Image
              unoptimized
              src={
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL + banner2?.Image?.url
              }
              width={1000}
              height={1000}
              alt={banner2?.Name}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
