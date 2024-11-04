import React, { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import { Headset, ShieldCheck, Truck } from 'lucide-react'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton" // Adjust import path if necessary

function Slider({ sliderList }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sliderList && sliderList.length > 0) {
      setLoading(false)
    }
  }, [sliderList])

  return (
    <div>
      {loading ? (
        <div className="space-y-4">
          {/* Image skeleton */}
          <Skeleton className="h-[200px] md:h-[300px] lg:h-[400px] w-full rounded-lg" />

          
        </div>
      ) : (
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
        >
          <CarouselContent>
            {sliderList.map((slider, index) => (
              <CarouselItem key={index}>
                {slider.SliderURL ? (
                  <Link href={slider.SliderURL}>
                    <Image
                      src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.Image?.url}
                      width={5000}
                      height={2500}
                      alt='Slider Image'
                      className='w-full h-auto object-contain'
                    />
                  </Link>
                ) : (
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + slider?.Image?.url}
                    width={5000}
                    height={2500}
                    alt='Slider Image'
                    className='w-full h-auto object-contain'
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
      <div className='flex justify-center bg-gray-50 dark:bg-gray-900 gap-10 md:gap-24 lg:gap-60 lg:py-5 md:py-3 py-2 px-2'>
        <div className='flex items-center gap-2'>
          <ShieldCheck className='w-5 md:w-7 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-xs font-bold'>1-Year</h2>
            <h2 className='text-xs'>Warranty</h2>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Truck className='w-5 md:w-7 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-xs font-bold'>Free</h2>
            <h2 className='text-xs'>Delivery</h2>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Headset className='w-5 md:w-7 h-auto' />
          <div className='flex flex-col'>
            <h2 className='text-xs font-bold'>24x7</h2>
            <h2 className='text-xs'>Support</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Slider;