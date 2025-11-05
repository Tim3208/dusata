export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Basic GET wrapper using fetch. Throws on non-2xx.
 * - credentials: include (for cookie-based auth)
 * - returns parsed JSON
 */
export async function apiGet(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch (_) {}
    throw new Error(`GET ${path} -> ${res.status} ${body}`);
  }

  // If empty body, return null
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`Failed to parse JSON from ${path}: ${e?.message || e}`);
  }
}
