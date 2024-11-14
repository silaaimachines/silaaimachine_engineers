import GlobalApi from "./_utils/GlobalApi";

// Define the base URL for the sitemap entries
const BASE_URL = "https://silaaimachines.com";

// Define the maximum number of URLs per batch (Google's limit is 50,000 URLs per sitemap)
const urlsPerSitemap = 50000;

export default async function sitemap() {
  try {
    // Fetch all data from GlobalApi
    const allProducts = await GlobalApi.getAllProducts();
    const allCategories = await GlobalApi.getAllCategories();
    const allCustomerTypes = await GlobalApi.getAllCustomerTypes();
    const allBrands = await GlobalApi.getAllBrandSliders();

    const sitemapEntries = [];

    // Generate product URLs in batches
    for (let i = 0; i < Math.ceil(allProducts.length / urlsPerSitemap); i++) {
      const batch = allProducts.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const batchUrls = batch.map((product) => ({
        url: `${BASE_URL}/product/${product.slug}`,
        lastModified: product.updatedAt || new Date().toISOString(),
      }));
      sitemapEntries.push(...batchUrls);
    }

    // Generate category URLs with products under each category
    for (let i = 0; i < Math.ceil(allCategories.length / urlsPerSitemap); i++) {
      const batch = allCategories.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const categoryBatchUrls = batch.map((category) => ({
        url: `${BASE_URL}/category/${category.slug}`,
        lastModified: category.updatedAt || new Date().toISOString(),
      }));
      sitemapEntries.push(...categoryBatchUrls);

      // Generate product URLs for each category (if applicable)
      for (const category of batch) {
        const categoryProducts = allProducts.filter(
          (product) =>
            product.category && product.category.slug === category.slug
        );
        for (
          let j = 0;
          j < Math.ceil(categoryProducts.length / urlsPerSitemap);
          j++
        ) {
          const productBatch = categoryProducts.slice(
            j * urlsPerSitemap,
            (j + 1) * urlsPerSitemap
          );
          const productBatchUrls = productBatch.map((product) => ({
            url: `${BASE_URL}/category/${category.slug}/product/${product.slug}`,
            lastModified: product.updatedAt || new Date().toISOString(),
          }));
          sitemapEntries.push(...productBatchUrls);
        }
      }
    }

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
        lastModified: customerType.updatedAt || new Date().toISOString(),
      }));
      sitemapEntries.push(...customerTypeBatchUrls);

      // Generate product URLs for each customer type (if applicable)
      for (const customerType of batch) {
        const customerTypeProducts = allProducts.filter(
          (product) =>
            product.customer_type &&
            product.customer_type.slug === customerType.slug
        );
        for (
          let j = 0;
          j < Math.ceil(customerTypeProducts.length / urlsPerSitemap);
          j++
        ) {
          const productBatch = customerTypeProducts.slice(
            j * urlsPerSitemap,
            (j + 1) * urlsPerSitemap
          );
          const productBatchUrls = productBatch.map((product) => ({
            url: `${BASE_URL}/customer-type/${customerType.slug}/product/${product.slug}`,
            lastModified: product.updatedAt || new Date().toISOString(),
          }));
          sitemapEntries.push(...productBatchUrls);
        }
      }
    }

    // Generate brand URLs with products under each brand
    for (let i = 0; i < Math.ceil(allBrands.length / urlsPerSitemap); i++) {
      const batch = allBrands.slice(
        i * urlsPerSitemap,
        (i + 1) * urlsPerSitemap
      );
      const brandBatchUrls = batch.map((brand) => ({
        url: `${BASE_URL}/brand/${brand.slug}`,
        lastModified: brand.updatedAt || new Date().toISOString(),
      }));
      sitemapEntries.push(...brandBatchUrls);

      // Generate product URLs for each brand (if applicable)
      for (const brand of batch) {
        const brandProducts = allProducts.filter(
          (product) => product.brand && product.brand.slug === brand.slug
        );
        for (
          let j = 0;
          j < Math.ceil(brandProducts.length / urlsPerSitemap);
          j++
        ) {
          const productBatch = brandProducts.slice(
            j * urlsPerSitemap,
            (j + 1) * urlsPerSitemap
          );
          const productBatchUrls = productBatch.map((product) => ({
            url: `${BASE_URL}/brand/${brand.slug}/product/${product.slug}`,
            lastModified: product.updatedAt || new Date().toISOString(),
          }));
          sitemapEntries.push(...productBatchUrls);
        }
      }
    }

    // Define URLs for static pages (e.g., homepage, about page, contact page)
    const staticUrls = [
      { url: BASE_URL, lastModified: new Date().toISOString() },
      { url: `${BASE_URL}/about`, lastModified: new Date().toISOString() },
      { url: `${BASE_URL}/contact`, lastModified: new Date().toISOString() },
      // Add other static pages as needed
    ];

    // Combine all URLs into one array
    return [...staticUrls, ...sitemapEntries];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
