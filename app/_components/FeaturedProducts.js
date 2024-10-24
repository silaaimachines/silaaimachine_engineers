import React from 'react';
import { motion } from 'framer-motion'; // Assuming you are using framer-motion for animations
import Image from 'next/image'; // Assuming you're using Next.js Image component
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const FeaturedProducts = ({ featuredProductsList }) => {
    // Animation variants
    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1 },
    };

    // Filter products where Featured is true
    const filteredProducts = featuredProductsList.filter(product => product?.Featured);

    // Helper function to calculate discount percentage
    const calculateDiscountPercentage = (basePrice, discountPrice) => {
        if (!basePrice || !discountPrice) return 0;
        return Math.round(((basePrice - discountPrice) / basePrice) * 100);
    };

    return (
        <div>
            <div className='flex items-center gap-2'>
                <h1 className='text-3xl font-semibold underline decoration-red-500'>Featured</h1>
                <h1 className='py-5 text-2xl font-semibold'>Products </h1>
            </div>

            {/* ScrollArea with explicit height */}
            <ScrollArea className="overflow-x-auto w-full">
                <div className="flex space-x-5">
                    {filteredProducts.map((product, index) => {
                        const { BasePrice, DiscountPrice, Name, Images } = product;
                        const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate="visible"
                                variants={itemVariants}
                                transition={{ duration: 2, delay: index * 0.1 }} // Delay for staggered effect
                                className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-lg border shrink-0 shadow-sm cursor-pointer hover:border-[#e42584] w-[250px]'
                            >
                                {Images && Images[0]?.url && (
                                    <Image
                                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                                        width={200} // Adjust size as necessary
                                        height={200} // Adjust size as necessary
                                        alt={Images[0]?.alternativeText || 'Product Image'}
                                        className='h-[200px] w-[200px] object-contain rounded-t-lg'
                                    />
                                )}
                                <div className='w-full bg-[#e42584] rounded-b-lg p-3'>
                                    <h2 className='text-sm text-center text-white'>{Name}</h2>
                                    <div className="text-center flex items-center justify-center gap-1">
                                        {DiscountPrice ? (
                                            <>
                                                <p className="text-lg font-semibold text-white">
                                                    ₹ {DiscountPrice}
                                                </p>
                                                <p className="text-sm line-through">
                                                    ₹ {BasePrice}
                                                </p>
                                                <p className="text-sm text-green-500">
                                                    {discountPercentage}% off
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-lg font-semibold text-white">
                                                ₹ {BasePrice}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
                <ScrollBar orientation="horizontal"/>
            </ScrollArea>
        </div>
    );
};

export default FeaturedProducts;
