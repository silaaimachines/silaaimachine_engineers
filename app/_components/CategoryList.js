import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LetterPullup from '@/components/ui/letter-pullup';


const CategoryList = ({ categoryList }) => {
  return (
    <div>
      <div className="flex items-center gap-1 md:gap-2 py-2 md:py-5">
      <LetterPullup words={"Shop by Categories"} delay={0.05} />
        
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-1">
        {categoryList.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`} passHref>
            <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl border shrink-0 cursor-pointer hover:border-theme_color w-full h-auto shadow-sm">
              <div className="relative">
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
                  width={200}
                  height={200}
                  alt={category?.Name || 'Category Image'}
                  className='object-cover rounded-t-2xl w-full h-auto'
                />
              </div>
              <div className="w-full bg-theme_color rounded-b-2xl">
                <h2 className="text-center text-sm py-2 text-white">{category?.Name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;