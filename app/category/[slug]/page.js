import CategoryPageContent from "./CategoryPageContent";

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
    title: `${title}`,

    openGraph: {
      title: `${title}`,
      url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/category/${slug}`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function CategoryPage({ params, searchParams }) {
  return <CategoryPageContent />;
}
