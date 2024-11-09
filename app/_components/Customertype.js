import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GradualSpacing from '@/components/ui/gradual-spacing';

const Customertype = ({ customerTypeList }) => {
  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2">
                <h1 className='font-bold w-full text-center px-2 py-1 md:py-2 text-4xl'>What are you looking for?</h1>
            </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
        {customerTypeList.map((customer_type, index) => (
          <Link key={index} href={`/customer-type/${customer_type.slug}`} passHref>
            <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl shrink-0 cursor-pointer w-full h-auto shadow-sm relative overflow-hidden">
              <div className="relative group">
                {customer_type?.Image?.url && (
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + customer_type.Image.url}
                    width={1000}
                    height={1000}
                    alt={customer_type?.Image?.alternativeText || 'Customer Type Image'}
                    className="object-cover rounded-2xl w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 flex items-end justify-center">
                  <h2 className="w-full p-3 backdrop-blur-sm backdrop:rounded-b-2xl text-center text-white text-lg md:text-2xl font-semibold">
                    {customer_type?.Name}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Customertype;