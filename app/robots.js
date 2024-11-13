export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: ["/service/*", "/sales/* "],
    },
    sitemap: "https://silaaimachines.com/sitemap.xml",
  };
}
