import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from '@/components/ui/carousel'

import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'

function BrandsSlider({ brandSliderList }) {
    return (
        <div className='container'>
            <Carousel
            plugins={[
                Autoplay({
                delay: 1000,
                }),
            ]}>
                <CarouselContent>
                    {brandSliderList.map((brand, index) => (
                        <CarouselItem key={index} className='basis-1/3 md:basis-1/3 lg:basis-1/5 flex justify-center items-center'>
                            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + brand?.Logo?.url}
                            width={75}
                            height={50}
                            alt={`${brand?.Name} Logo`}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}

export default BrandsSlider;