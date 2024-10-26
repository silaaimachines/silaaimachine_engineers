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
    <div>
      <h2>{product.Name}</h2>
      <p>{product.Description}</p>
      <p>Base Price: ₹{product.BasePrice}</p>
      <p>Discount Price: ₹{product.DiscountPrice}</p>
      <p>Quantity Available: {product.Quantity}</p>
      <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.Images[0]?.url} alt={product.Name} width={500} height={500} />
    </div>
  );
}
