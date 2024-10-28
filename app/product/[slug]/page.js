'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GlobalApi.getProductBySlug(params.slug);
        
        if (response) {
          const fetchedProduct = response.data.data[0];
          setProduct(fetchedProduct);
          
          // Fetch related products by category and exclude the current product
          if (fetchedProduct.category && fetchedProduct.category.slug) {
            const relatedResponse = await GlobalApi.getProductsForCategories(fetchedProduct.category.slug);
            const filteredRelatedProducts = relatedResponse.data.data
              .filter((relatedProduct) => relatedProduct.slug !== params.slug)
              .slice(0, 12); // Limit to 12 related products
            setRelatedProducts(filteredRelatedProducts);
          }
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
    <div className="p-6 space-y-8">
      {/* Product Details */}
      <div className="grid grid-cols-2 gap-6">
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

      {/* Related Products */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Related Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct, index) => (
            <Link key={index} href={`/product/${relatedProduct.slug}`} passHref>
              <div className="border p-4 rounded-lg hover:shadow-lg transition duration-150">
                <Image
                  src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + relatedProduct.Images[0]?.url}
                  alt={relatedProduct.Name}
                  width={200}
                  height={200}
                  className="object-cover mb-2"
                />
                <h3 className="text-lg font-semibold">{relatedProduct.Name}</h3>
                <p className="text-gray-600">₹{relatedProduct.DiscountPrice}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
