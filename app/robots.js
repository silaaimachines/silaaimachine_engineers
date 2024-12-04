export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "*",
      disallow: ["/service/*", "/sales/* "],
    },
    sitemap: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/sitemap.xml`,
  };
}
