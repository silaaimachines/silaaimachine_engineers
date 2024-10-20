'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const SwiperComponent = () => {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      loop={true}
      autoplay={{ delay: 3000 }} // Adjust the autoplay delay as per your preference
      modules={[Navigation, Pagination, Autoplay]}
      style={{ width: '100%', height: 'auto' }} // Set width to full and height to auto
    >
      {/* SwiperSlide with responsive Image */}
      <SwiperSlide>
        <div className="relative w-full h-64"> {/* Container for responsive image */}
          <Image
            src={'/1.png'}
            alt="code image"
            fill
            className="object-cover" // Make image cover the parent div
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive sizes
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-64">
          <Image
            src={'/2.png'}
            alt="code image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-64">
          <Image
            src={'/3.png'}
            alt="code image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="relative w-full h-64">
          <Image
            src={'/4.png'}
            alt="code image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};
export default SwiperComponent;
