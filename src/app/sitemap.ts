import type { MetadataRoute } from "next";

function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/ro`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/en`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
