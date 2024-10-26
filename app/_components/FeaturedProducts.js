import React from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import Link from 'next/link';

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
        <div ref={ref}>
            <div className='flex items-center gap-2'>
                <h1 className='font-semibold underline decoration-theme_color text-lg md:text-3xl'>Featured</h1>
                <h1 className='py-5 font-semibold text-md md:text-2xl'>Products </h1>
            </div>

            <ScrollArea className="w-full overflow-hidden">
                <div className="flex space-x-1">
                    {filteredProducts.map((product, index) => {
                        const { BasePrice, DiscountPrice, Name, Images, slug } = product; // Get slug from product
                        const discountPercentage = calculateDiscountPercentage(BasePrice, DiscountPrice);

                        return (
                            <Link key={index} href={`/product/${slug}`} passHref> {/* Update Link to navigate to /product/[slug] */}
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
                                                width={200} // Adjust size as necessary
                                                height={200} // Adjust size as necessary
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
