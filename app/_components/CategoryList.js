import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const CategoryList = ({ categoryList }) => {
  return (
    <div>
      <div className="flex items-center gap-2 py-2 md:py-5">
        <h1 className="font-semibold text-md md:text-2xl">Shop by</h1>
        <h1 className="font-semibold underline decoration-theme_color text-lg md:text-3xl">Categories</h1>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-1">
        {categoryList.map((category, index) => (
          <Link key={index} href={`/category/${category.slug}`} passHref>
            <div className="flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl cursor-pointer border hover:border-theme_color w-full h-auto">
              <div className="relative">
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + category?.Images?.url}
                  width={200}
                  height={200}
                  alt={category?.Name || 'Category Image'}
                  className="object-cover rounded-t-2xl w-full h-auto"
                />
              </div>
              <div className="rounded-b-2xl w-full bg-black dark:bg-gray-700 py-2">
                <h2 className="m-1 text-center text-white text-sm">{category?.Name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;