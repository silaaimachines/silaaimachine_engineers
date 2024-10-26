import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import Link from 'next/link';
import GlobalApi from '../_utils/GlobalApi';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 });

    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    // Helper function to calculate discount percentage
    const calculateDiscountPercentage = (basePrice, discountPrice) => {
        if (!basePrice || !discountPrice) return 0;
        return Math.round(((basePrice - discountPrice) / basePrice) * 100);
    };

    // Fetch all featured products on component mount
    useEffect(() => {
        const fetchFeaturedProducts = () => {
            GlobalApi.getAllFeaturedProducts().then(res => {
                setFeaturedProducts(res);
              });
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div ref={ref}>
            <div className='flex items-center gap-1 py-2 md:py-5'>
                <h1 className='font-semibold underline decoration-theme_color'>Featured</h1>
                <h1 className='font-semibold'>Products</h1>
            </div>

            <ScrollArea className="w-full overflow-hidden">
                <div className="flex space-x-1">
                    {featuredProducts.map((product, index) => {
                        const { BasePrice, DiscountPrice, Name, Images, slug } = product;
                        const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

                        return (
                            <Link key={index} href={`/product/${slug}`} passHref>
                                <motion.div
                                    initial="hidden"
                                    animate={isInView ? "visible" : "hidden"}
                                    variants={itemVariants}
                                    transition={{ duration: 1, delay: index * 0.1 }}
                                    className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl border shrink-0 shadow-sm cursor-pointer hover:border-theme_color'
                                >
                                    <div className="relative">
                                        {Images && Images[0]?.url && (
                                            <Image
                                                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                                                width={200}
                                                height={200}
                                                alt={Images[0]?.alternativeText || 'Product Image'}
                                                className='object-cover rounded-t-2xl w-full/2 h-[100px] md:h-[150px] lg:h-auto'
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
                                            <h2 className='text-center text-white text-sm bg-[#fd94b4] p-1'>{Name}</h2>
                                        </div>
                                        <div className="text-center flex items-center justify-center gap-3 m-2">
                                            {DiscountPrice ? (
                                                <>
                                                    <p className="text-sm font-semibold">
                                                        ₹ {DiscountPrice}
                                                    </p>
                                                    <p className="text-sm line-through">
                                                        ₹ {BasePrice}
                                                    </p>
                                                </>
                                            ) : (
                                                <p className="font-semibold text-sm">
                                                    ₹ {BasePrice}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
};

export default FeaturedProducts;
