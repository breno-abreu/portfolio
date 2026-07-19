/** Prefix public asset paths with Vite's base (e.g. `/portfolio/` on GitHub Pages). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}
