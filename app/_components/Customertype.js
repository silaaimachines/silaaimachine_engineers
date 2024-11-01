import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GradualSpacing from '@/components/ui/gradual-spacing';


const Customertype = ({ customerTypeList }) => {
  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2">
      <GradualSpacing
          className="font-display text-center text-lg md:text-2xl font-bold -tracking-widest md:leading-[5rem]"
          text="Shop by Customer Type"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-1">
        {customerTypeList.slice(0, 6).map((customer_type, index) => (
          <Link key={index} href={`/customer-type/${customer_type.slug}`} passHref>
            <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl border shrink-0 cursor-pointer hover:border-theme_color w-full h-auto shadow-sm">
              <div className="relative">
                {customer_type?.Image?.url && (
                  <Image
                    src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + customer_type.Image.url}
                    width={200}
                    height={200}
                    alt={customer_type?.Image?.alternativeText || 'Customer Type Image'}
                    className="object-contain rounded-t-2xl w-full h-full "
                  />
                )}
              </div>
              <div className="w-full bg-theme_color rounded-b-2xl">
                <h2 className="text-center text-sm py-2 text-white">{customer_type?.Name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Customertype;
