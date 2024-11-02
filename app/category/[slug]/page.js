'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import BoxReveal from '@/components/ui/box-reveal';

import FlipText from '@/components/ui/flip-text';
import { Separator } from '@/components/ui/separator';



export default function CategoryPage() {
  const params = useParams();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    fetchCategoryDetails();
    fetchProducts(page);
  }, [params.slug, page]);

  const fetchCategoryDetails = async () => {
    try {
      const response = await GlobalApi.getCategoryBySlug(params.slug);
      if (response.data.data.length) {
        setCategory(response.data.data[0]);
      } else {
        console.error('No category found');
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  const fetchProducts = async (currentPage) => {
    setLoading(true);
    try {
      const response = await GlobalApi.getProductsForCategories(params.slug, currentPage);
      setProducts((prev) => [...prev, ...response.data.data]);
      if (response.data.meta.pagination) {
        setTotalPages(response.data.meta.pagination.pageCount);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll with Intersection Observer
  const lastProductRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, page, totalPages]);

  return (
    <div className="p-3 md:p-5">
    
 <h2 className="text-xl font-semibold mb-4">{category?.Name}</h2>
<Separator/>

      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-3 md:gap-4 lg:gap-6 py-2 md:py-5">
        {products.map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images, slug } = product;
          const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);
          const isLastProduct = index === products.length - 1;

          return (
            <Link key={index} href={`/product/${slug}`} passHref>
              <BackgroundGradient>
                <div
                  ref={isLastProduct ? lastProductRef : null}
                  className="relative group"
                >

                  <div className="relative flex flex-col items-center justify-center border border-gray-300 rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black shadow-sm cursor-pointer">
                    <div className="relative z-10">
                      <div className="relative">
                        {Images && Images[0]?.url && (
                          <Image
                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
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
                        <BoxReveal boxColor={"#00000000"} duration={0.5}>
                          <h2 className="text-xs md:text-sm px-3 py-2">{Name}</h2>
                        </BoxReveal>
                        <div className="text-center flex items-center justify-center gap-3  text-xs md:text-sm py-2 rounded-b-2xl">
                          {DiscountPrice ? (
                            <>
                              <BoxReveal boxColor={"#e61a72"} duration={1}>
                                <p className="text-sm font-semibold">{formatPrice(DiscountPrice)}</p>
                              </BoxReveal>

                              <BoxReveal boxColor={"#e61a72"} duration={1}>
                                <p className="text-xs line-through ">{formatPrice(BasePrice)}</p>
                              </BoxReveal>
                            </>
                          ) : (
                            <BoxReveal boxColor={"#e61a72"} duration={1}>
                              <p className="text-sm font-semibold text-center">{formatPrice(BasePrice)}</p>
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

      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
        </div>
      )}
    </div>
  );
}

// Helper function to calculate discount
const calculateDiscountPercentage = (basePrice, discountPrice) => {
  if (!basePrice || !discountPrice) return 0;
  return Math.round(((basePrice - discountPrice) / basePrice) * 100);
};

// Helper function to format price
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};