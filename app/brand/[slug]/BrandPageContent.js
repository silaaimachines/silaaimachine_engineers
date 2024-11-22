"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import BoxReveal from "@/components/ui/box-reveal";
import { useTheme } from "next-themes";
import MetaPixel from "@/app/_components/MetaPixel";

const BrandPageContent = () => {
  const { theme } = useTheme();
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [brand, setBrand] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noProducts, setNoProducts] = useState(false);
  const observer = useRef();

  // Memoized fetchBrandDetails
  const fetchBrandDetails = useCallback(async () => {
    try {
      const response = await GlobalApi.getBrandBySlug(params.slug);
      if (response.data.data.length) {
        setBrand(response.data.data[0]);
      } else {
        setNoProducts(true);
      }
    } catch (error) {
      console.error("Error fetching brand details:", error);
    }
  }, [params.slug]);

  // Memoized getProductList
  const getProductList = useCallback(
    async (currentPage) => {
      setLoading(true);
      try {
        const response = await GlobalApi.getProductsForBrands(
          params.slug,
          currentPage
        );
        const newProducts = response.data.data;
        setProductList((prev) => [...prev, ...newProducts]);

        // Update total pages and no-products state
        if (response.data.meta.pagination) {
          setTotalPages(response.data.meta.pagination.pageCount);
        }
        if (newProducts.length === 0 && currentPage === 1) {
          setNoProducts(true);
        }
      } catch (error) {
        console.error("Error fetching product list:", error);
      } finally {
        setLoading(false);
      }
    },
    [params.slug]
  );

  // Infinite scrolling observer
  const lastProductRef = useCallback(
    (node) => {
      if (loading || page >= totalPages) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

  // Fetch brand details and product list on dependencies change
  useEffect(() => {
    getProductList(page);
    fetchBrandDetails();
  }, [page, fetchBrandDetails, getProductList]);

  // Utility: Calculate discount percentage
  const calculateDiscountPercentage = (basePrice, discountPrice) => {
    if (!basePrice || !discountPrice) return 0;
    return Math.round(((basePrice - discountPrice) / basePrice) * 100);
  };

  // Utility: Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <MetaPixel />
      <div className="p-3 md:p-5">
        {/* Brand Banner */}
        {brand.Banner && (
          <div className="mb-4">
            <Image
              unoptimized
              src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + brand.Banner.url}
              alt="Banner"
              width={1000}
              height={1000}
              className="rounded-2xl w-full object-cover"
            />
          </div>
        )}

        {/* Brand Name */}
        <h2 className="text-xl font-semibold mb-4">{brand?.Name || "Brand"}</h2>

        {/* Product List or No Products Message */}
        {noProducts ? (
          <p className="text-center">No products found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-start gap-3 md:gap-4 lg:gap-6 py-2 md:py-5">
            {productList.map((product, index) => {
              const { BasePrice, DiscountPrice, Name, Images, slug, id } =
                product;
              const discountPercentage = calculateDiscountPercentage(
                BasePrice,
                DiscountPrice
              );
              const isLastProduct = index === productList.length - 1;

              return (
                <Link key={id || index} href={`/product/${slug}`} passHref>
                  <BackgroundGradient>
                    <div
                      ref={isLastProduct ? lastProductRef : null}
                      className="relative group"
                    >
                      <div className="relative flex flex-col items-center justify-center border rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black shadow-sm cursor-pointer">
                        <div className="relative z-10">
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
                                  width={400}
                                  height={400}
                                  alt={Name}
                                  className="rounded-t-2xl h-full w-full object-contain p-3"
                                />
                              </div>
                            )}
                            {DiscountPrice && (
                              <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                {discountPercentage}% off
                              </div>
                            )}
                          </div>
                          <div className="rounded-b-2xl w-full">
                            <h2 className="text-xs md:text-sm px-3 py-2">
                              {Name}
                            </h2>
                            <div className="text-center flex items-center justify-center gap-3 text-xs md:text-sm py-2 rounded-b-2xl">
                              {DiscountPrice ? (
                                <>
                                  <BoxReveal
                                    boxColor={"#e61a72"}
                                    duration={0.25}
                                  >
                                    <p className="text-sm font-semibold">
                                      {formatPrice(DiscountPrice)}
                                    </p>
                                  </BoxReveal>
                                  <BoxReveal
                                    boxColor={"#e61a72"}
                                    duration={0.25}
                                  >
                                    <p className="text-xs line-through">
                                      {formatPrice(BasePrice)}
                                    </p>
                                  </BoxReveal>
                                </>
                              ) : (
                                <BoxReveal boxColor={"#e61a72"} duration={0.25}>
                                  <p className="text-sm font-semibold text-center">
                                    {formatPrice(BasePrice)}
                                  </p>
                                </BoxReveal>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BackgroundGradient>
                </Link>
              );
            })}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default BrandPageContent;
