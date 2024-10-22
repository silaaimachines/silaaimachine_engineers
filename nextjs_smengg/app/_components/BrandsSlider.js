import React from 'react'
import Image from 'next/image'

function BrandsSlider({ brandSliderList }) {
    return (
        <div className='container relative overflow-hidden'>
            <div className='flex justify-center'>
                <div className='flex gap-20 overflow-hidden' 
                     style={{
                         maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                         WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                     }}>
                    {brandSliderList.map((brand, index) => (
                        <div key={index} className='flex-none'>
                            <Image 
                                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + brand?.Logo?.url}
                                width={100}
                                height={50}
                                alt={`Brand ${index}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BrandsSlider;