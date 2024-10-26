'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';

export default function CustomerTypePage() {
  const params = useParams();
  const [customerType, setCustomerType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerType = async () => {
      try {
        const response = await GlobalApi.getCustomerTypeBySlug(params.slug);
        console.log(response.data.data);
        
        if (response && response.data.data.length > 0) {
          setCustomerType(response.data.data[0]);  // Set the first matching customer type
        } else {
          setError('No customer type found');
        }
      } catch (err) {
        setError('Error fetching customer type');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerType();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>{customerType.Name}</h2>
     
      
    </div>
  );
}
