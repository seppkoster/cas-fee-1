export function buildUrl(baseURL, params = null) {
  if (!params) {
    return baseURL;
  }
  return `${baseURL}?${Object.entries(params)
    .map(([key, value]) => (value ? `${key}=${value}` : null))
    .filter(Boolean)
    .join("&")}`;
}
