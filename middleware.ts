import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Paths to exclude from authentication
  const excludedPaths = ["/admin/login", "/admin/logout"];

  // If the current pathname is in the excluded paths, let the request pass
  if (excludedPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // If no token is found, redirect to the login page
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed if the token exists
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/author/publish"], 
};
