'use client'; // Make sure this is present for client-side functionality

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Import useParams from next/navigation
import GlobalApi from '@/app/_utils/GlobalApi';

const SearchPage = () => {
    const params = useParams(); // Use useParams to access the route parameters
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get search query from params
    const searchTerm = params.query; // Adjust based on your dynamic route structure

    useEffect(() => {
        if (searchTerm) {
            fetchFilteredProducts(searchTerm); // Fetch products if searchTerm exists
        }
    }, [searchTerm]); // Run effect when searchTerm changes

    const fetchFilteredProducts = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await GlobalApi.searchProducts(searchTerm); // Use the searchProducts method
            setProductList(response.data.data); // Adjust this based on your API response structure
        } catch (error) {
            console.error('Error fetching filtered products:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-3 md:p-5">
            <h2 className="text-xl font-semibold mb-4">Search Results for: {searchTerm}</h2>
            {loading ? (
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-3 md:gap-4 lg:gap-6 py-2 md:py-5">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <div key={product.id} className="product-card">
                                {/* Render your product details here */}
                                <h3>{product.Name}</h3>
                            </div>
                        ))
                    ) : (
                        <div>No products found.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
