import React from 'react';
import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Image from 'next/image';

function BrandCard({ logo }) {
    return (
        <div className={cn("flex items-center justify-center p-4")}>
            <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + logo}
                width={75}
                height={50}
                alt="Brand Logo"
                className='w-[50px] md:w-[75px] h-auto'
            />
        </div>
    );
}

function BrandsSlider({ brandSliderList }) {
    return (
        <div className='container relative flex items-center justify-center'>
            <Marquee pauseOnHover className="[--duration:20s]">
                {brandSliderList.map((brand) => (
                    <BrandCard key={brand?.Name} logo={brand?.Logo?.url} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    );
}

export default BrandsSlider;
