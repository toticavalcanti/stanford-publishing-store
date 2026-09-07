/**
 * Local cover files present in /public/covers, keyed by book slug.
 *
 * Populate it by running `node scripts/download-covers.mjs`, which downloads the
 * covers from the publisher's public site and rewrites this file. Anything not
 * listed here falls back to the remote URL and then to a typographic cover, so a
 * missing entry can never produce a 404.
 */
export const localCovers: Record<string, string> = {};
