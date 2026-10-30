import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/content/portfolio";
import { getSiteUrl, isIndexable } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  if (!origin || !isIndexable()) return [];
  return [
    { url: origin, priority: 1 },
    ...getPublishedProjects().map((project) => ({
      url: `${origin}/projects/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
