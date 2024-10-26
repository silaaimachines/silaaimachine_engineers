'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GlobalApi.getProductBySlug(params.slug);
        if (response.data && response.data.length > 0) {
          setProduct(response.data[0]); // Assuming the product is returned as an array
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
    <div>
      <h2>{product.Name}</h2>
      <p>{product.Description}</p>
      <p>Price: {product.BasePrice}</p>
      <p>Discount Price: {product.DiscountPrice}</p>
      <p>Quantity: {product.Quantity}</p>
      {product.Images && product.Images.length > 0 && (
        <img src={product.Images[0].formats.thumbnail.url} alt={product.Name} />
      )}
    </div>
  );
}