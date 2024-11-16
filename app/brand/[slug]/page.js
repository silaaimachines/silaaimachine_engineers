import BrandPageContent from "./BrandPageContent";

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
    title: `${title} Sewing Machine & Accessories`,

    openGraph: {
      title: `${title} Sewing Machine & Accessories`,
      url: `https://silaaimachines.com/brand/${slug}`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function BrandPage({ params, searchParams }) {
  return <BrandPageContent />;
}
