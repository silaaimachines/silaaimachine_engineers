import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SingleProduct = () => {
  return (
    <div>

<section className="text-gray-600 body-font overflow-hidden bg-white">
  <div className="container mx-auto py-24 px-5">
    <div className="flex flex-wrap justify-center items-center lg:w-full mx-auto bg-white rounded-lg overflow-hidden">
      {/*  <!-- Image Section --> */}
      <div className="w-full lg:w-1/2 p-5">
        <Image
          src="https://m.media-amazon.com/images/I/61UE8SbqpwL._AC_UF894,1000_QL80_.jpg"
          width={500}
          height={500}
          alt="product"
          className="object-cover object-center w-full h-96 lg:h-auto shadow-lg rounded-lg mb-6 lg:mb-0"
        />
      </div>

      {/*  <!-- Product Info Section --> */}
      <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0 p-8">
        <h2 className="text-sm title-font text-gray-400 tracking-widest uppercase mb-2">
          BRAND NAME
        </h2>
        <h1 className="text-4xl font-semibold title-font text-gray-900 mb-4">
          The Catcher in the Rye
        </h1>
        <p className="leading-relaxed text-lg mb-6">
          Fam locavore kickstarter distillery. Mixtape chillwave tumeric
          sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps
          cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine
          tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean
          shorts keytar banjo tattooed umami cardigan.
        </p>
        {/* <!-- Price and Button --> */}
        <div className="flex flex-col items-start w-full">
          <span className="text-3xl font-bold text-gray-900 mb-4">$58.00</span>
          <button className="w-full text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded-full transition duration-300 ease-in-out mb-4 sm:mb-0 sm:w-auto sm:ml-auto">
            Buy Now
          </button>
        </div>
      </div>
    </div>

    {/*   <!-- Related Products Section --> */}
    <div className="mt-16">
  <h2 className="text-3xl font-semibold title-font text-gray-900 mb-8">
    Related Products
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
    {/*  <!-- Related Product 1 --> */}
    <div className="relative group">
      <div className="absolute -inset-3 text-black bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg
       blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000"></div>
      <div className="relative bg-white rounded-lg p-6 border hover:scale-105 transition duration-300">
        <Image
          alt="related"
          className="object-cover object-center w-full h-48 rounded-lg mb-6 shadow-lg"
          src="https://m.media-amazon.com/images/I/41vbH9ahvLL._SX300_SY300_QL70_FMwebp_.jpg"
          width={400}
          height={400}
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Name 1
        </h3>
        <span className="block text-2xl font-bold text-gray-900">$45.00</span>
      </div>
    </div>

    {/*  <!-- Related Product 2 --> */}
    <div className="relative group">
      <div className="absolute -inset-3 text-black bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000"></div>
      <div className="relative bg-white rounded-lg p-6 border hover:scale-105 transition duration-300">
        <img
          alt="related"
          className="object-cover object-center w-full h-48 rounded-lg mb-6 shadow-lg"
          src="https://dummyimage.com/500x500"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Name 2
        </h3>
        <span className="block text-2xl font-bold text-gray-900">$60.00</span>
      </div>
    </div>

    {/* <!-- Related Product 3 --> */}
    <div className="relative group">
      <div className="absolute -inset-3 text-black bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000"></div>
      <div className="relative bg-white rounded-lg p-6 border hover:scale-105 transition duration-300">
        <img
          alt="related"
          className="object-cover object-center w-full h-48 rounded-lg mb-6 shadow-lg"
          src="https://dummyimage.com/500x500"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Name 3
        </h3>
        <span className="block text-2xl font-bold text-gray-900">$38.00</span>
      </div>
    </div>

    {/* <!-- Related Product 4 --> */}
    <div className="relative group">
      <div className="absolute -inset-3 text-black bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000"></div>
      <div className="relative bg-white rounded-lg p-6 border hover:scale-105 transition duration-300">
        <img
          alt="related"
          className="object-cover object-center w-full h-48 rounded-lg mb-6 shadow-lg"
          src="https://dummyimage.com/500x500"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Name 4
        </h3>
        <span className="block text-2xl font-bold text-gray-900">$50.00</span>
      </div>
    </div>

    {/* <!-- Related Product 5 --> */}
    <div className="relative group">
      <div className="absolute -inset-3 text-black bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-10000 group-hover:duration-12000"></div>
      <div className="relative bg-white rounded-lg p-6 border hover:scale-105 transition duration-300">
        <img
          alt="related"
          className="object-cover object-center w-full h-48 rounded-lg mb-6 shadow-lg"
          src="https://dummyimage.com/500x500"
        />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Product Name 5
        </h3>
        <span className="block text-2xl font-bold text-gray-900">$70.00</span>
      </div>
    </div>
  </div>
</div>


  </div>
</section>



    </div>
  )
}

export default SingleProduct
