'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomerTypePage() {
  const params = useParams();
  const [productList, setProductList] = useState([]);
  const [customerType, setCustomerType] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observer = useRef();

  useEffect(() => {
    const fetchCustomerType = async () => {
      try {
        const response = await GlobalApi.getCustomerTypeBySlug(params.slug);
        if (response && response.data.data.length > 0) {
          setCustomerType(response.data.data[0]);
        } else {
          setError('No customer type found');
        }
      } catch (err) {
        setError('Error fetching customer type');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerType();
  }, [params.slug]);

  useEffect(() => {
    if (customerType) {
      getProductList(page);
    }
  }, [customerType, page]);

  const getProductList = (currentPage) => {
    setLoading(true);
    GlobalApi.getProductsForCustomerType(params.slug, currentPage)
      .then((res) => {
        setProductList((prevList) => [...prevList, ...res.data.data]);
        if (res.data.meta && res.data.meta.pagination) {
          setTotalPages(res.data.meta.pagination.pageCount);
        }
      })
      .finally(() => setLoading(false));
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

  if (loading && !productList.length) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
              <div
                ref={isLastProduct ? lastProductRef : null}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-theme_color rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>
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
                      <h2 className="text-xs md:text-sm px-3 py-2">{Name}</h2>
                      <div className="text-center flex items-center justify-center gap-3 text-white text-xs md:text-sm bg-black dark:bg-gray-700 py-2 rounded-b-2xl">
                        {DiscountPrice ? (
                          <>
                            <p className="text-sm font-semibold">{formatPrice(DiscountPrice)}</p>
                            <p className="text-xs line-through text-gray-300">{formatPrice(BasePrice)}</p>
                          </>
                        ) : (
                          <p className="text-sm font-semibold text-center">{formatPrice(BasePrice)}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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