import { NextResponse } from "next/server";

const isSafeAdminPath = (path) =>
  typeof path === "string" && path.startsWith("/admin") && !path.startsWith("/admin/login");

export function proxy(request) {
  const { nextUrl } = request;
  const { pathname, search } = nextUrl;
  const token = request.cookies.get("admin_token")?.value;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isLoginPage = pathname === "/admin/login";

  if (!token && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isLoginPage) {
    const requestedPath = nextUrl.searchParams.get("next");
    const redirectPath = isSafeAdminPath(requestedPath)
      ? requestedPath
      : "/admin/pages";
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

