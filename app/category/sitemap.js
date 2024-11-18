import GlobalApi from "../_utils/GlobalApi";

// Define the base URL for the sitemap entries
const BASE_URL = "https://silaaimachines.com";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi

    const allCategories = await GlobalApi.getAllCategories();

    const sitemapEntries = [];

    // Generate category URLs with products under each category
    for (let i = 0; i < Math.ceil(allCategories.length / urlsPerSitemap); i++) {
      const batch = allCategories.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const categoryBatchUrls = batch.map((category) => ({
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: category.updatedAt || category.createdAt,
      }));
      sitemapEntries.push(...categoryBatchUrls);
    }

    // Combine all URLs into one array
    return [...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
