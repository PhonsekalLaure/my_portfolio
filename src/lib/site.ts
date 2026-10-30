import "server-only";

/** An explicit production origin, never an inferred Vercel preview address. */
export function getSiteUrl(): string | undefined {
  const input = process.env.SITE_URL;
  if (!input) return undefined;
  try {
    const url = new URL(input);
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash ||
      url.hostname === "localhost"
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function isIndexable() {
  return (
    Boolean(getSiteUrl()) &&
    process.env.VERCEL_ENV !== "preview" &&
    process.env.VERCEL_ENV !== "development"
  );
}
