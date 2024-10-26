import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { Headset, ShieldCheck, Truck } from 'lucide-react'

function Slider({ sliderList }) {
  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}>
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <Image 
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.Image?.url}
                width={5000}
                height={2500}
                alt='Slider Image'
                className='w-full h-auto object-contain'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className='flex justify-between bg-gray-50 dark:bg-gray-800 gap-5 p-2 lg:px-80 md:px-40 lg:py-5 md:py-3 py-2'>
        <div className='flex items-center gap-2'>
          <ShieldCheck className='w-7 md:w-10 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-sm font-bold'>1-Year</h2>
            <h2 className='text-sm'>Warranty</h2>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Truck className='w-7 md:w-10 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-sm font-bold'>Free</h2>
            <h2 className='text-sm'>Delivery</h2>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Headset className='w-7 md:w-10 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-sm font-bold'>24x7</h2>
            <h2 className='text-sm'>Support</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider