import CustomerTypeContent from "./CustomerTypeContent";

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
    title: `${title} Customer Type`,

    openGraph: {
      title: `${title} Customer Type`,
      url: `https://silaaimachines.com/customer-type/${slug}`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function CustomerTypePage({ params, searchParams }) {
  return <CustomerTypeContent />;
}
