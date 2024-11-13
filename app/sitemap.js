import GlobalApi from "./_utils/GlobalApi";

// Import your API handler
const BASE_URL = "https://silaaimachines.com";

export default async function sitemap() {
  // Fetch all products from GlobalApi
  const allProducts = await GlobalApi.getAllProducts();

  // Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
  const urlsPerSitemap = 50000;
  const productSitemapEntries = [];

  // Generate product URLs in batches
  for (let i = 0; i < Math.ceil(allProducts.length / urlsPerSitemap); i++) {
    const batch = allProducts.slice(
      i * urlsPerSitemap,
      (i + 1) * urlsPerSitemap
    );

    // Map through each product in the batch to create its sitemap entry
    const batchUrls = batch.map((product) => ({
      url: `${BASE_URL}/product/${product.slug}`,
      lastModified: product.dateModified || new Date().toISOString(),
    }));

    // Add this batch of product URLs to the main sitemap entries
    productSitemapEntries.push(...batchUrls);
  }

  // Define URLs for static pages (e.g., homepage, about page, contact page)
  const otherUrls = [
    { url: BASE_URL, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/about`, lastModified: new Date().toISOString() },
    { url: `${BASE_URL}/contact`, lastModified: new Date().toISOString() },
    // Add other static pages as needed
  ];

  // Return a combined array of all URLs for the sitemap
  return [...otherUrls, ...productSitemapEntries];
}
