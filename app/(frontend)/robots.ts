const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
  : "http://localhost:3001";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
