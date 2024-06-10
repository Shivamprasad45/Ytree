import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Setting CORS headers
  response.headers.append(
    "Access-Control-Allow-Origin",
    "https://greenfatuer.vercel.app"
  );
  response.headers.append(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.headers.append(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/Auth/Login" ||
    path === "/Auth/Signup" ||
    path === "/Auth/Verify-succes";

  const token = request.cookies.get("token")?.value || "";

  if (token) {
    // If the token is present, allow access to the home page or other private routes
    if (path === "/" || !isPublic) {
      return response;
    }

    // If the token is present but the path is public, rewrite to the home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !token) {
    // If the path is not public and no token is found, redirect to the signup page
    return NextResponse.redirect(new URL("/Auth/Signup", request.url));
  }

  // Allow the request to proceed for public paths
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Auth/Login", "/Auth/Signup", "/Auth/Verify-succes"],
};
