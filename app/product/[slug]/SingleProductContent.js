"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselThumbnail,
} from "@/components/ui/carousel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { remark } from "remark";
import html from "remark-html";
import BoxReveal from "@/components/ui/box-reveal";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDescription, setFormattedDescription] = useState("");

  const { theme } = useTheme();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await GlobalApi.getProductBySlug(params.slug);

        if (response) {
          const fetchedProduct = response.data.data[0];
          setProduct(fetchedProduct);

          // Format the product description
          if (fetchedProduct.Description) {
            // Preprocess to preserve spaces and newlines
            const formattedDescription = fetchedProduct.Description.replace(
              / {2,}/g,
              (match) => "&nbsp;".repeat(match.length)
            ).replace(/\n/g, "  \n");

            // Process with remark
            const processedDescription = await remark()
              .use(html)
              .process(formattedDescription);

            setFormattedDescription(processedDescription.toString());
          }

          // Fetch related products by category and exclude the current product
          if (fetchedProduct.category && fetchedProduct.category.slug) {
            const relatedResponse = await GlobalApi.getProductsForCategories(
              fetchedProduct.category.slug
            );
            const filteredRelatedProducts = relatedResponse.data.data
              .filter((relatedProduct) => relatedProduct.slug !== params.slug)
              .slice(0, 12); // Limit to 12 related products
            setRelatedProducts(filteredRelatedProducts);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Error fetching product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  // Helper function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-theme_color border-solid"></div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-5 md:p-10 lg:px-20">
      <div className="flex flex-col md:flex-row gap-9 pb-10">
        {/* Left section - Product images */}
        <div className="flex-1 w-full md:w-1/2 md:sticky md:top-20 self-start">
          <div className="flex justify-center items-center">
            {product.Images && product.Images.length > 0 ? (
              <Carousel className="w-full">
                <CarouselContent>
                  {product.Images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div
                        className="relative w-full h-auto rounded-2xl overflow-hidden bg-cover bg-center"
                        style={{
                          backgroundImage:
                            theme === "dark"
                              ? `url('/DarkThemeBackgroundImage.webp')`
                              : `url('/LightThemeBackgroundImage.webp')`,
                        }}
                      >
                        <Image
                          unoptimized
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_BASE_URL + image.url
                          }
                          alt={`${product.Name} image ${index + 1}`}
                          width={500}
                          height={500}
                          className="object-contain w-full h-auto"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselThumbnail />
              </Carousel>
            ) : (
              <p>No images available</p>
            )}
          </div>
        </div>

        {/* Right section - Product details */}
        <div className="flex-1 w-full md:w-1/2 md:sticky md:top-20 self-start space-y-4">
          <h1 className="text-lg md:text-2xl font-bold">{product.Name}</h1>

          <div className="flex justify-start items-center gap-2 text-md md:text-lg font-semibold">
            {product.DiscountPrice ? (
              <>
                <p className="font-semibold">
                  {formatPrice(product.DiscountPrice)}
                </p>
                <p className="line-through text-gray-500">
                  {formatPrice(product.BasePrice)}
                </p>
                <p className="ml-2 text-green-500 text-sm">
                  (
                  {Math.round(
                    ((product.BasePrice - product.DiscountPrice) /
                      product.BasePrice) *
                      100
                  )}
                  % off)
                </p>
              </>
            ) : (
              <>{formatPrice(product.BasePrice)}</>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Attribute</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Brand</TableCell>
                <TableCell className="text-right">
                  {product.brand?.Name || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Customer Type</TableCell>
                <TableCell className="text-right">
                  {product.customer_type?.Name || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Category</TableCell>
                <TableCell className="text-right">
                  {product.category?.Name || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Color</TableCell>
                <TableCell className="text-right">
                  {product.Color || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Dimension</TableCell>
                <TableCell className="text-right">
                  {product.Dimension || "N/A"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Material</TableCell>
                <TableCell className="text-right">
                  {product.Material || "N/A"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="flex justify-center items-center gap-2 w-full">
            {/* Amazon Button */}
            <Button
              asChild
              disabled={!product.AmazonAffiliateLink}
              className="flex items-center w-full"
            >
              {product.AmazonAffiliateLink ? (
                <Link
                  href={product.AmazonAffiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                  <Image
                    unoptimized
                    src="/amazon-icon-dark.svg"
                    width={15}
                    height={15}
                    alt="Amazon Icon Dark"
                  />
                </Link>
              ) : (
                <Button
                  disabled
                  className="flex items-center w-full cursor-not-allowed"
                >
                  Buy Now
                  <Image
                    unoptimized
                    src="/amazon-icon-dark.svg"
                    width={15}
                    height={15}
                    alt="Amazon Icon Dark"
                  />
                </Button>
              )}
            </Button>

            {/* Flipkart Button */}
            <Button
              asChild
              disabled={!product.FlipkartAffiliateLink}
              className="flex items-center w-full"
            >
              {product.FlipkartAffiliateLink ? (
                <Link
                  href={product.FlipkartAffiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy Now
                  <Image
                    unoptimized
                    src="/flipkart-icon.svg"
                    width={15}
                    height={15}
                    alt="Flipkart Icon"
                  />
                </Link>
              ) : (
                <Button
                  disabled
                  className="flex items-center w-full cursor-not-allowed"
                >
                  Buy Now
                  <Image
                    unoptimized
                    src="/flipkart-icon.svg"
                    width={15}
                    height={15}
                    alt="Flipkart Icon"
                  />
                </Button>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <h1 className="text-sm md:text-lg font-bold text-center py-2 md:py-5">
          Product Description
        </h1>
        <div
          className="prose max-w-none" // Use Tailwind Typography for styled markdown
          dangerouslySetInnerHTML={{ __html: formattedDescription }}
        ></div>
      </div>

      {/* Related Products */}
      <div className="space-y-4 py-5">
        <h2 className="text-sm md:text-lg font-bold text-center py-2 md:py-5">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 sm:gap-2">
          {relatedProducts.map((relatedProduct, index) => (
            <Link key={index} href={`/product/${relatedProduct.slug}`} passHref>
              <BackgroundGradient>
                <div className="group relative flex flex-col items-center justify-center border rounded-2xl transition-all duration-300 ease-in-out bg-white dark:bg-black shadow-sm cursor-pointer hover:shadow-lg">
                  <div className="absolute -inset-1 bg-theme_color rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative z-10 flex flex-col items-center bg-white dark:bg-black rounded-2xl">
                    <div className="relative">
                      {relatedProduct.Images &&
                        relatedProduct.Images[0]?.url && (
                          <Image
                            unoptimized
                            src={
                              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                              relatedProduct.Images[0].url
                            }
                            width={400}
                            height={400}
                            alt={relatedProduct.Name}
                            className="rounded-t-2xl h-full w-full object-contain p-3"
                          />
                        )}
                      {relatedProduct.DiscountPrice && (
                        <div className="absolute top-5 right-5 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {Math.round(
                            ((relatedProduct.BasePrice -
                              relatedProduct.DiscountPrice) /
                              relatedProduct.BasePrice) *
                              100
                          )}
                          % off
                        </div>
                      )}
                    </div>
                    <div className="rounded-b-2xl w-full">
                      <h3 className="text-xs md:text-sm px-3 py-2">
                        {relatedProduct.Name}
                      </h3>
                      <div className="text-center flex items-center justify-center gap-3 text-xs md:text-sm py-2 rounded-b-2xl">
                        {relatedProduct.DiscountPrice ? (
                          <>
                            <BoxReveal boxColor={"#e61a72"} duration={0.25}>
                              <p className="text-sm font-semibold">
                                {formatPrice(relatedProduct.DiscountPrice)}
                              </p>
                            </BoxReveal>
                            <BoxReveal boxColor={"#e61a72"} duration={0.25}>
                              <p className="text-xs line-through">
                                {formatPrice(relatedProduct.BasePrice)}
                              </p>
                            </BoxReveal>
                          </>
                        ) : (
                          <BoxReveal boxColor={"#e61a72"} duration={0.25}>
                            <p className="text-sm font-semibold text-center">
                              {formatPrice(relatedProduct.BasePrice)}
                            </p>
                          </BoxReveal>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </BackgroundGradient>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
