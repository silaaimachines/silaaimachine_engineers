import GlobalApi from "@/app/_utils/GlobalApi";

export async function generateSitemaps() {
  // Use the global API function to get all products
  const products = await GlobalApi.getAllProducts();

  // Calculate total products and the number of sitemaps needed
  const totalProducts = products.length;
  const numberOfSitemaps = Math.ceil(totalProducts / 50000);

  // Generate an array of sitemap IDs based on the number of sitemaps
  return Array.from({ length: numberOfSitemaps }, (_, index) => ({
    id: index,
  }));
}

export default async function sitemap({ id }) {
  const start = id * 50000;
  const end = start + 50000;

  // Get all products from the global API and slice the range for this sitemap
  const allProducts = await GlobalApi.getAllProducts();
  const products = allProducts.slice(start, end);

  // Map products to the sitemap format
  return products.map((product) => ({
    url: `https://www.silaaimachines.com/product/${product.slug}`,
    lastModified: product.date,
  }));
}
