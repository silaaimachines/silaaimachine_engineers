'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import BoxReveal from '@/components/ui/box-reveal';

export default function CustomerTypePage() {
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [customerType, setCustomerType] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const observer = useRef();



  useEffect(() => {

    getProductList(page);
    fetchCustomerTypeDetails();

  }, [params.slug, page]);

  const getProductList = async (currentPage) => {
    setLoading(true);
    try {
      const response = await GlobalApi.getProductsForCustomerType(params.slug, currentPage);
      setProductList((prev) => [...prev, ...response.data.data]);
      if (response.data.meta.pagination) {
        setTotalPages(response.data.meta.pagination.pageCount);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }

  };

  const fetchCustomerTypeDetails = async () => {
    try {
      const response = await GlobalApi.getProductsForCustomerType(params.slug);
      if (response.data.data.length) {
        setCustomerType(response.data.data[0]);
      } else {
        console.error('No customer type found');
      }
    } catch (error) {
      console.error('Error fetching customer type details:', error);
    }
  };



  const lastProductRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && page < totalPages) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, page, totalPages]);

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



  return (
    <div className="p-3 md:p-5">
      <h2 className="text-xl font-semibold mb-4">{customerType?.Name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-3 md:gap-4 lg:gap-6 py-2 md:py-5">
        {productList.map((product, index) => {
          const { BasePrice, DiscountPrice, Name, Images, slug } = product;
          const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);
          const isLastProduct = index === productList.length - 1;

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
                        <div className="text-center flex items-center justify-center gap-3 text-white text-xs md:text-sm bg-black dark:bg-gray-700 py-2 rounded-b-2xl">
                          {DiscountPrice ? (
                            <>
                              <BoxReveal boxColor={"#e61a72"} duration={1}>
                                <p className="text-sm font-semibold">{formatPrice(DiscountPrice)}</p>
                              </BoxReveal>

                              <BoxReveal boxColor={"#e61a72"} duration={1}>
                                <p className="text-xs line-through text-gray-300">{formatPrice(BasePrice)}</p>
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

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
        </div>
      )}
    </div>
  );
}