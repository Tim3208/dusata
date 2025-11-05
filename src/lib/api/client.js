export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const DEV_BEARER = import.meta.env.VITE_API_TOKEN || "";
const DEV_API_KEY = import.meta.env.VITE_API_KEY || "";

function authHeaders() {
  const headers = {};
  if (DEV_BEARER) headers["Authorization"] = `Bearer ${DEV_BEARER}`;
  if (DEV_API_KEY) headers["X-API-KEY"] = DEV_API_KEY;
  return headers;
}

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
      ...authHeaders(),
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

/**
 * Basic POST wrapper using fetch. Throws on non-2xx.
 * - credentials: include (for cookie-based auth)
 * - sends JSON body
 * - returns parsed JSON if available
 */
export async function apiPost(path, body, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
    body: JSON.stringify(body ?? {}),
    ...options,
  });

  if (!res.ok) {
    let text = "";
    try {
      text = await res.text();
    } catch (_) {}
    throw new Error(`POST ${path} -> ${res.status} ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }
  // No/other content type
  return {};
}
