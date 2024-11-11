export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: ["/service/*"],
    },
    sitemap: "https://silaaimachines.com/sitemap.xml",
  };
}
