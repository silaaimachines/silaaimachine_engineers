import GlobalApi from "../_utils/GlobalApi";
import { BASE_URL } from "../lib/constants";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi

    const allCustomerTypes = await GlobalApi.getAllCustomerTypes();

    const sitemapEntries = [];

    // Generate customer type URLs with products under each customer type
    for (
      let i = 0;
      i < Math.ceil(allCustomerTypes.length / urlsPerSitemap);
      i++
    ) {
      const batch = allCustomerTypes.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const customerTypeBatchUrls = batch.map((customerType) => ({
        url: `${BASE_URL}/customer-type/${customerType.slug}`,
        lastModified: customerType.updatedAt || customerType.createdAt,
      }));
      sitemapEntries.push(...customerTypeBatchUrls);
    }

    // Combine all URLs into one array
    return [...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
