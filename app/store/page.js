"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import BoxReveal from "@/components/ui/box-reveal";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Store = () => {
  const [productList, setProductList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState(""); // State for sort option
  const observer = useRef();

  useEffect(() => {
    getProductList(page);
  }, [page]);

  const getProductList = (currentPage) => {
    setLoading(true);
    GlobalApi.getProducts(currentPage)
      .then((res) => {
        setProductList((prevList) => [...prevList, ...res.data.data]);
        if (res.data.meta && res.data.meta.pagination) {
          setTotalPages(res.data.meta.pagination.pageCount);
        }
      })
      .finally(() => setLoading(false));
  };

  const lastProductRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, page, totalPages]
  );

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

  // Function to get sorted product list based on sortOption
  const getSortedProducts = (products) => {
    let sortedProducts = [...products];
    switch (sortOption) {
      case "high_to_low":
        sortedProducts.sort(
          (a, b) =>
            (b.DiscountPrice || b.BasePrice) - (a.DiscountPrice || a.BasePrice)
        );
        break;
      case "low_to_high":
        sortedProducts.sort(
          (a, b) =>
            (a.DiscountPrice || a.BasePrice) - (b.DiscountPrice || b.BasePrice)
        );
        break;
      case "discount":
        sortedProducts.sort((a, b) => {
          const discountA = calculateDiscountPercentage(
            a.BasePrice,
            a.DiscountPrice
          );
          const discountB = calculateDiscountPercentage(
            b.BasePrice,
            b.DiscountPrice
          );
          return discountB - discountA; // Higher discount first
        });
        break;
      case "new_arrival":
        // Assuming you want to sort by createdAt, most recent first
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  // Get the sorted product list for rendering
  const sortedProductList = getSortedProducts(productList);

  return (
    <div className="p-3 md:p-5">
      <div>
        <Select onValueChange={setSortOption}>
          {" "}
          {/* Update sort option on change */}
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high_to_low">Price: High to Low</SelectItem>
            <SelectItem value="low_to_high">Price: Low to High</SelectItem>
            <SelectItem value="discount">Better Discount</SelectItem>
            <SelectItem value="new_arrival">New Arrival</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center gap-x-3 gap-y-5 py-2 md:py-5">
        {sortedProductList.map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images, slug } = product;
          const discountPercentage = calculateDiscountPercentage(
            BasePrice,
            DiscountPrice
          );
          const isLastProduct = index === sortedProductList.length - 1;

          return (
            <Link key={index} href={`/product/${slug}`} passHref>
              <BackgroundGradient>
                <div ref={isLastProduct ? lastProductRef : null}>
                  <div className="flex flex-col items-center justify-center rounded-2xl border transition-all duration-300 ease-in-out bg-white dark:bg-black cursor-pointer">
                    <div className="relative">
                      {Images && Images[0]?.url && (
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
                      )}
                      {DiscountPrice && (
                        <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {discountPercentage}% off
                        </div>
                      )}
                    </div>
                    <div className="rounded-b-2xl w-full">
                      <h2 className="text-xs md:text-sm px-3 py-2">{Name}</h2>
                      <div className="text-center flex items-center justify-center gap-3 text-xs md:text-sm py-2 rounded-b-2xl">
                        {DiscountPrice ? (
                          <>
                            <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                              <p className="text-sm font-semibold">
                                {formatPrice(DiscountPrice)}
                              </p>
                            </BoxReveal>
                            <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                              <p className="text-xs line-through text-gray-500 dark:text-gray-300">
                                {formatPrice(BasePrice)}
                              </p>
                            </BoxReveal>
                          </>
                        ) : (
                          <BoxReveal boxColor={"#e61a72"} duration={0.5}>
                            <p className="text-sm font-semibold text-center">
                              {formatPrice(BasePrice)}
                            </p>
                          </BoxReveal>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </BackgroundGradient>
            </Link>
          );
        })}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
        </div>
      )}
    </div>
  );
};

export default Store;
