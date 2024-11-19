// Define the base URL for the sitemap entries
const BASE_URL = "https://silaaimachines.com";

export default async function sitemap() {
  try {
    // Define URLs for static pages (e.g., homepage, about page, contact page)
    const staticUrls = [
      { url: BASE_URL, lastModified: new Date().toISOString() },
      { url: `${BASE_URL}/store`, lastModified: new Date().toISOString() },
      { url: `${BASE_URL}/contact-us`, lastModified: new Date().toISOString() },
      {
        url: `${BASE_URL}/privacy-policy`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/terms-of service`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/brand/sitemap.xml`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/category/sitemap.xml`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/customer-type/sitemap.xml`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/product/sitemap.xml`,
        lastModified: new Date().toISOString(),
      },
      {
        url: `${BASE_URL}/tag/sitemap.xml`,
        lastModified: new Date().toISOString(),
      },
    ];

    // Combine all URLs into one array
    return [...staticUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
