import { BASE_URL } from "@/app/lib/constants";
import GlobalApi from "../_utils/GlobalApi";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi

    const alltags = await GlobalApi.getAllTags();

    const sitemapEntries = [];

    // Generate Tag URLs with products
    for (let i = 0; i < Math.ceil(alltags.length / urlsPerSitemap); i++) {
      const batch = alltags.slice(i * urlsPerSitemap, (i + 1) * urlsPerSitemap);
      const tagsBatchUrls = batch.map((tags) => ({
        url: `${BASE_URL}/tag/${tags.slug}`,
        lastModified: tags.updatedAt || tags.createdAt,
      }));
      sitemapEntries.push(...tagsBatchUrls);
    }

    // Combine all URLs into one array
    return [...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
