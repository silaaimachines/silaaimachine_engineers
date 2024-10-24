import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../../components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

function Slider({sliderList}) {
  return (
    <Carousel
    plugins={[
      Autoplay({
        delay: 3000,
      }),
    ]}>
    <CarouselContent>
      {sliderList.map((slider, index) => (
        <CarouselItem key={index}>
          <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider?.Image?.url}
          width={5000}
          height={2500}
          alt='Slider Image'
          className='w-full h-auto rounded-2xl object-contain'
          />
        </CarouselItem>
      ))}
    </CarouselContent>
    </Carousel>
  )
}

export default Slider