import GlobalApi from "./_utils/GlobalApi";

export default async function pagesSitemap() {
  const baseUrl = "https://silaaimachines.com";

  const staticPages = [
    { url: `${baseUrl}` },
    { url: `${baseUrl}/store` },
    { url: `${baseUrl}/contact-us` },
    { url: `${baseUrl}/privacy-policy` },
  ];

  return staticPages;
}
