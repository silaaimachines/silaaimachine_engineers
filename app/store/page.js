import StoreContentPage from "./StoreContentPage";

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
  };
}

export default function StorePage({ params, searchParams }) {
  return <StoreContentPage />;
}
