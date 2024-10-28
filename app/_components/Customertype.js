import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Customertype = ({ customerTypeList }) => {
  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2 py-2 md:py-5 px-5">
        <h1 className="font-semibold text-lg md:text-2xl">Shop by</h1>
        <h1 className="font-semibold underline decoration-red-500 text-lg md:text-2xl">Customer-Type</h1>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-1 md:gap-3 lg:gap-5">
        {customerTypeList.slice(0, 6).map((customer_type, index) => (
          <Link key={index} href={`/customer-type/${customer_type.slug}`} passHref>
            <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl border shrink-0 cursor-pointer hover:border-[#e42584] w-full h-auto shadow-sm">
              <div className="relative">
                {customer_type?.Image?.url && (
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + customer_type.Image.url}
                    width={200}
                    height={200}
                    alt={customer_type?.Image?.alternativeText || 'Customer Type Image'}
                    className="object-cover rounded-t-2xl w-full h-auto p-3"
                  />
                )}
              </div>
              <div className="w-full bg-black dark:bg-gray-700 rounded-b-2xl">
                <h2 className="text-center text-xs md:text-sm py-2 text-white">{customer_type?.Name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Customertype;
