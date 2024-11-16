import StoreLocationContent from "./StoreLocationContent";

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
    title: "Contact Us",

    openGraph: {
      title: "Contact Us",
      url: `https://silaaimachines.com/contact-us`,
      siteName: "Silaaimachine Engineers",
    },
  };
}

export default function ContactUsPage({ params, searchParams }) {
  return <StoreLocationContent />;
}
