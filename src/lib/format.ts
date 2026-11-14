export const str = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

export const list = (value: unknown): string[] =>
  Array.isArray(value) ? value.map(str).filter(Boolean) : [];

/**
 * Only allow http(s) URLs so a typo can never become a script link.
 * The URL is returned exactly as written, not rewritten by the browser.
 */
export function httpUrl(value: unknown): string {
  const raw = str(value);
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? raw : "";
  } catch {
    return "";
  }
}

/**
 * A usable image address, or "". Accepts a full http(s) URL or a path relative
 * to the site root (a file in public/), and refuses every other scheme.
 */
export function imageSrc(value: unknown): string {
  const raw = str(value);
  if (!raw) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith("//")) return "";
  const base = import.meta.env.BASE_URL || "/";
  return (base.endsWith("/") ? base : base + "/") + raw.replace(/^\.?\//, "");
}

/** Readable form of a URL: host and path, without protocol, "www." or query. */
export function urlHandle(url: string): string {
  try {
    const { hostname, pathname } = new URL(url);
    return hostname.replace(/^www\./, "") + pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
}

export function emailAddress(value: unknown): string {
  const raw = str(value);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw) ? raw : "";
}
