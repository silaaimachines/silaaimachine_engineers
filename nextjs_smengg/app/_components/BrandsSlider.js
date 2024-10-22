import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

function BrandsSlider({brandSliderList}) {
    return (
        <Carousel
        plugins={[
            Autoplay({
            delay: 2000,
            }),
        ]}>
        <CarouselContent>
            {brandSliderList.map((brand, index) => (
            <CarouselItem key={index}>
                <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+brand?.Logo?.url}
                width={150}
                height={150}
                alt='Slider Image'
                className='w-auto'
                />
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
        </Carousel>
    )
}

export default BrandsSlider