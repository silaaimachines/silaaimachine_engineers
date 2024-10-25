import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";

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

    // Use the useInView hook to check visibility
    const ref = React.useRef(null);
    const isInView = useInView(ref, { triggerOnce: true, threshold: 0.2 }); // Animation triggers once, when 20% of the element is visible

    return (
        <div ref={ref}> {/* Apply the ref to the wrapper div */}
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold underline decoration-theme_color text-lg md:text-3xl'>Featured</h1>
                <h1 className='py-5 font-semibold text-md md:text-2xl'>Products </h1>
            </div>

            {/* ScrollArea with explicit height */}
            <ScrollArea className="overflow-x-auto w-full">
                <div className="flex space-x-1">
                    {filteredProducts.map((product, index) => {
                        const { BasePrice, DiscountPrice, Name, Images } = product;
                        const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

                        return (
                            <motion.div
                                key={index}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"} // Animation only triggers when in view
                                variants={itemVariants}
                                transition={{ duration: 1, delay: index * 0.1 }} // Delay for staggered effect
                                className='flex flex-col items-center justify-center transition duration-300 ease-in-out rounded-2xl border shrink-0 shadow-sm cursor-pointer hover:border-theme_color'
                            >
                                {Images && Images[0]?.url && (
                                    <Image
                                        src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + Images[0].url}
                                        width={200} // Adjust size as necessary
                                        height={200} // Adjust size as necessary
                                        alt={Images[0]?.alternativeText || 'Product Image'}
                                        className='h-[200px] w-[200px] object-contain rounded-t-2xl'
                                    />
                                )}
                                <div className='w-full bg-[#e42584] rounded-b-2xl'>
                                    <h2 className='text-sm text-center text-white'>{Name}</h2>
                                    <div className="text-center flex items-center justify-center gap-1">
                                        {DiscountPrice ? (
                                            <>
                                                <p className="text-sm font-semibold text-white">
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
                                            <p className="font-semibold text-white text-sm">
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