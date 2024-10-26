'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_utils/GlobalApi';
import Image from 'next/image';

export default function CategoryPage() {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GlobalApi.getCategoryBySlug(params.slug);
        console.log(response.data.data);
        
        if (response) {
          setCategories(response.data.data[0]);
        } else {
          setError('No categories found');
        }
      } catch (err) {
        setError('Error fetching categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
 <div>
  <h2>{categories.Name}</h2>
 </div>
  );
}
