import React from "react";
import Image from "next/image";
import Link from "next/link";
import BoxReveal from "@/components/ui/box-reveal";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { useTheme } from "next-themes";

const FeaturedProducts = ({ featuredProductsList }) => {
  const { theme } = useTheme();

  // Helper function to calculate discount percentage
  const calculateDiscountPercentage = (basePrice, discountPrice) => {
    if (!basePrice || !discountPrice) return 0;
    return Math.round(((basePrice - discountPrice) / basePrice) * 100);
  };

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2">
        <h1 className="font-bold px-2 py-1 md:py-2 md:text-lg">
          Featured Products
        </h1>
      </div>

      <div className="items-start grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-3 lg:gap-5">
        {featuredProductsList.slice(0, 6).map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images, slug } = product;
          const discountPercentage = calculateDiscountPercentage(
            BasePrice,
            DiscountPrice
          );

          return (
            <Link key={index} href={`/product/${slug}`} passHref>
              <BackgroundGradient>
                <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl shrink-0 cursor-pointer border w-full h-auto bg-white dark:bg-black">
                  <div className="relative">
                    {Images && Images[0]?.url && (
                      <div
                        className="rounded-t-2xl"
                        style={{
                          backgroundImage:
                            theme === "dark"
                              ? `url('/DarkThemeBackgroundImage.webp')`
                              : `url('/LightThemeBackgroundImage.webp')`,
                        }}
                      >
                        <Image
                          unoptimized
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                            Images[0].url
                          }
                          width={200}
                          height={200}
                          alt={Images[0]?.alternativeText || "Product Image"}
                          className="object-cover rounded-t-2xl w-full h-auto p-3"
                        />
                      </div>
                    )}
                    {DiscountPrice && (
                      <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-2 py-1 rounded-full ">
                        {discountPercentage}% off
                      </div>
                    )}
                  </div>
                  <div className="rounded-b-2xl w-full">
                    <div>
                      <h2 className="text-xs md:text-sm px-3 pt-3">{Name}</h2>
                    </div>
                    <div className="text-center flex items-center justify-center gap-1 md:gap-2 lg:gap-3 text-xs md:text-sm py-2 rounded-b-2xl">
                      {DiscountPrice ? (
                        <>
                          <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                            <p className="text-sm font-semibold">
                              {formatPrice(DiscountPrice)}
                            </p>
                          </BoxReveal>
                          <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                            <p className="text-xs line-through">
                              {formatPrice(BasePrice)}
                            </p>
                          </BoxReveal>
                        </>
                      ) : (
                        <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                          <p className="font-semibold text-sm text-center">
                            {formatPrice(BasePrice)}
                          </p>
                        </BoxReveal>
                      )}
                    </div>
                  </div>
                </div>
              </BackgroundGradient>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
