import SearchPageContent from "./SearchPageContent";

export async function generateMetadata({ params, searchParams }, parent) {
  const { slug } = params;

  // Capitalize the first letter of each word
  const title = slug
    ? slug
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

  return {
    title: `Search results for ${title}`,

    openGraph: {
      title: `Search results for ${title}`,
      url: `https://silaaimachines.com/search/${slug}`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function SearchPage({ params, searchParams }) {
  return <SearchPageContent />;
}
