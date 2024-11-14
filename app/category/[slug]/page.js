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

  console.log(title);

  return {
    title: `${title}`,
  };
}

export default function CategoryPage({ params, searchParams }) {
  return <CategoryPageContent />;
}
