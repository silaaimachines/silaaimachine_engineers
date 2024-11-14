import BrandPageContent from "./BrandPageContent";

export async function generateMetadata({ params, searchParams }, parent) {
  const { slug } = await params; // Await the params object here
  console.log(slug);
  return {
    title: slug ? slug : "",
  };
}

export default function BrandPage({ params, searchParams }) {
  return <BrandPageContent />;
}
