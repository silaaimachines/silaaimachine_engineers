import GlobalApi from "../_utils/GlobalApi";
import { BASE_URL } from "../lib/constants";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi

    const allProducts = await GlobalApi.getAllProducts();

    const sitemapEntries = [];

    // Generate product URLs in batches
    for (let i = 0; i < Math.ceil(allProducts.length / urlsPerSitemap); i++) {
      const batch = allProducts.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const batchUrls = batch.map((product) => ({
        url: `${BASE_URL}/product/${product.slug}`,
        lastModified: product.updatedAt || product.createdAt,
      }));
      sitemapEntries.push(...batchUrls);
    }

    // Combine all URLs into one array
    return [...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
