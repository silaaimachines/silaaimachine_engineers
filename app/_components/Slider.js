import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../../components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Headset, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Adjust import path if necessary

function BrandCard({ logo }) {
  return (
    <div className={cn("flex items-center justify-center px-3 md:px-5 py-3")}>
      <Image
        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + logo}
        width={75}
        height={50}
        alt="Brand Logo"
        className="w-[50px] md:w-[75px] h-auto"
      />
    </div>
  );
}

function Slider({ sliderList }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sliderList && sliderList.length > 0) {
      setLoading(false);
    }
  }, [sliderList]);

  return (
    <div className="relative md:-top-5">
      {" "}
      {/* Apply relative positioning here */}
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
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                        slider?.Image?.url
                      }
                      width={5000}
                      height={2500}
                      alt="Slider Image"
                      className="w-full h-auto object-contain"
                    />
                  </Link>
                ) : (
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      slider?.Image?.url
                    }
                    width={5000}
                    height={2500}
                    alt="Slider Image"
                    className="w-full h-auto object-contain"
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}

export default Slider;
