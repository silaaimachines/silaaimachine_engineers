'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GlobalApi.getProductBySlug(params.slug);
        console.log(response.data.data);

        if (response) {
          setProduct(response.data.data[0]);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Error fetching product data');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      {/* Left Side - Product Image */}
      <div className="flex justify-center items-center">
        {product.Images && product.Images[0] && (
          <Image
            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.Images[0].url}
            alt={product.Name}
            width={500}
            height={500}
            className="object-cover"
          />
        )}
      </div>

      {/* Right Side - Product Details */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{product.Name}</h1>
        <p className="text-gray-600">{product.Description}</p>
        <div className="text-xl font-semibold">
          Price: <span className="line-through text-gray-500">₹{product.BasePrice}</span> ₹{product.DiscountPrice}
        </div>
        <p className="text-sm text-red-500">
          {product.Quantity > 0 ? `In Stock: ${product.Quantity}` : 'Out of Stock'}
        </p>
      </div>
    </div>
  );
}
