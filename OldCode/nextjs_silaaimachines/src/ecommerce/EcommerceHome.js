import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"


export const EcommerceHome = () => {
    return (
        <div className='w-full h-full'>
            <Carousel className="w-full max-w-sm  bg-green-500 md:bg-red-500 ">
                <CarouselContent className="-ml-1">
                    <CarouselItem className='h-full '>
                        <Card className="sm:mt-4 md:ml-6 lg:mr-8 ">
                            <CardContent className="flex aspect-square items-center justify-center p-6 lg:bg-green-500">
                                <span className="text-3xl font-semibold">khhuhh</span>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className='h-full w-full'>
                        <Card className="sm:mt-4 md:ml-6 lg:mr-8 ">
                            <CardContent className="flex aspect-square items-center justify-center p-6 ">
                                <span className="text-3xl font-semibold">khhuhh</span>
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className='h-full w-full'>
                        <Card className="sm:mt-4 md:ml-6 lg:mr-8 ">
                            <CardContent className="flex aspect-square items-center justify-center p-6 ">
                                <span className="text-3xl font-semibold">khhuhh</span>
                                <img
                            alt=""
                            src="https://silaaimachines.com/wp-content/uploads/2024/09/Silaaimachines-Website-Logo.png"
                            className="h-8 w-auto"
                        />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                    <CarouselItem className="mr-auto">
                        <img
                            alt=""
                            src="https://silaaimachines.com/wp-content/uploads/2024/09/Silaaimachines-Website-Logo.png"
                            className="h-8 w-auto"
                        />
                    </CarouselItem>


                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>



        </div>

    )
}

export const EcommerceHome2 = () => {
    return (





        <div>


            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/420x260" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">$16.00</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/421x261" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p className="mt-1">$21.15</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/422x262" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p className="mt-1">$12.00</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/423x263" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p className="mt-1">$18.40</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/424x264" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                                <p className="mt-1">$16.00</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/425x265" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                                <p className="mt-1">$21.15</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/427x267" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                                <p className="mt-1">$12.00</p>
                            </div>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src="https://dummyimage.com/428x268" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                                <h2 className="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                                <p className="mt-1">$18.40</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
