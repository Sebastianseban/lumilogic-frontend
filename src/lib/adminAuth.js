const ADMIN_TOKEN_COOKIE = "admin_token";
const ACCESS_TOKEN_KEY = "accessToken";
const ADMIN_TOKEN_KEY = "admin_token";

const isBrowser = () => typeof window !== "undefined";

const readCookie = (name) => {
  if (!isBrowser()) return "";
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : "";
};

export const getAdminToken = () => {
  if (!isBrowser()) return "";
  return (
    localStorage.getItem(ADMIN_TOKEN_KEY) ||
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    readCookie(ADMIN_TOKEN_COOKIE) ||
    ""
  );
};

export const setAdminToken = (token, maxAgeSeconds = 60 * 60 * 24 * 7) => {
  if (!isBrowser() || !token) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
  document.cookie = `${ADMIN_TOKEN_COOKIE}=${encodeURIComponent(
    token
  )}; path=/; max-age=${maxAgeSeconds}; samesite=lax`;
};

export const clearAdminToken = () => {
  if (!isBrowser()) return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  document.cookie = `${ADMIN_TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
};

