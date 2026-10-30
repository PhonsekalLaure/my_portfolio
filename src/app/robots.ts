import type { MetadataRoute } from "next";
import { getSiteUrl, isIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteUrl();
  return isIndexable() && origin
    ? {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${origin}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
