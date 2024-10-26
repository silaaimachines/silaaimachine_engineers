import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';


const FeaturedProducts = ({ featuredProductsList }) => {
    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, filter: 'blur(8px)'},
        visible: { opacity: 1, scale: 1, filter: 'blur(0px)'},
    };

    // Helper function to calculate discount percentage
    const calculateDiscountPercentage = (basePrice, discountPrice) => {
        if (!basePrice || !discountPrice) return 0;
        return Math.round(((basePrice - discountPrice) / basePrice) * 100);
    };

    const ref = React.useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

    return (
        <div ref={ref}>
            <div className='flex items-center gap-1 md:gap-2 py-2 md:py-5'>
                <h1 className='font-semibold underline decoration-theme_color text-lg md:text-2xl'>Featured</h1>
                <h1 className='font-semibold text-lg md:text-2xl'>Products</h1>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-6 gap-1">
                {featuredProductsList.slice(0, 6).map((product, index) => {
                    const { BasePrice, DiscountPrice, Name, Images, slug } = product;
                    const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

                    return (
                        <Link key={index} href={`/product/${slug}`} passHref>
                            <motion.div
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                variants={itemVariants}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl shrink-0 cursor-pointer border hover:border-theme_color w-full h-auto'
                            >
                                <div className="relative">
                                    {Images && Images[0]?.url && (
                                        <Image
                                            src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                                            width={200}
                                            height={200}
                                            alt={Images[0]?.alternativeText || 'Product Image'}
                                            className='object-cover rounded-t-2xl w-full h-auto'
                                        />
                                    )}
                                    {DiscountPrice && (
                                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                            {discountPercentage}% off
                                        </div>
                                    )}
                                </div>
                                <div className='rounded-b-2xl w-full'>
                                    <div>
                                        <h2 className='text-center text-xs md:text-sm py-2'>{Name}</h2>
                                    </div>
                                    <div className="text-center flex items-center justify-center gap-3 text-white text-xs md:text-sm bg-theme_color py-2 rounded-b-2xl">
                                        {DiscountPrice ? (
                                            <>
                                                <p className="text-sm font-semibold">
                                                    ₹{DiscountPrice}
                                                </p>
                                                <p className="text-xs line-through">
                                                    ₹{BasePrice}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="font-semibold text-sm">
                                                ₹{BasePrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default FeaturedProducts;