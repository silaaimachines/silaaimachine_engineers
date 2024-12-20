import ProductPageContent from "./SingleProductContent";

export async function generateMetadata({ params, searchParams }, parent) {
  const { slug } = await params;

  // Capitalize the first letter of each word
  const title = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  return {
    title: `Buy ${title}`,

    openGraph: {
      title: `Buy ${title}`,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/product/${slug}`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function SingleProductPage({ params, searchParams }) {
  return <ProductPageContent />;
}
