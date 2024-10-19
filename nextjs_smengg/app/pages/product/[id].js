// If you're using the App Router (app directory), use this import
'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ProductPage = () => {
  const router = useRouter(); // Use this from next/navigation in App Router
  const productId = router.query?.id || 1;

  // Demo content
  const product = {
    id: productId,
    name: 'Demo Product',
    price: '$49.99',
    description:
      'This is a demo product description. It highlights the key features of the product in detail.',
    image: '/demo-product.jpg', // Demo image path
  };

  return (
    <div className="container mx-auto p-4 md:p-8 text-white min-h-screen">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        {/* Product Image */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">{product.price}</p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Add to Cart Button */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Additional Product Information */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">More Information</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
          imperdiet, quam a faucibus luctus, arcu ligula bibendum purus, et
          tincidunt odio mi at enim.
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
