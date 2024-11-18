import GlobalApi from "../_utils/GlobalApi";

// Define the base URL for the sitemap entries
const BASE_URL = "https://silaaimachines.com";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi

    const allBrands = await GlobalApi.getAllBrandSliders();

    const sitemapEntries = [];

    // Generate brand URLs with products under each brand
    for (let i = 0; i < Math.ceil(allBrands.length / urlsPerSitemap); i++) {
      const batch = allBrands.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const brandBatchUrls = batch.map((brand) => ({
        url: `${BASE_URL}/brand/${brand.slug}`,
        lastModified: brand.updatedAt || brand.updatedAt,
      }));
      sitemapEntries.push(...brandBatchUrls);
    }

    // Combine all URLs into one array
    return [...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
