import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/portal", "/admin"];
const authRoutes = ["/login", "/register", "/forgot-password"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for auth token (simplified — in production use NextAuth middleware)
  const token = request.cookies.get("next-auth.session-token")?.value
    || request.cookies.get("__Secure-next-auth.session-token")?.value;

  // Protect portal and admin routes
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/portal", request.url));
  }

  // Set locale header from Accept-Language
  const response = NextResponse.next();
  const acceptLanguage = request.headers.get("accept-language") || "";
  const locale = acceptLanguage.includes("ar") ? "ar" : "en";
  response.headers.set("x-locale", locale);

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|videos|fonts|models).*)",
  ],
};
