import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Setting CORS headers
  response.headers.append("Access-Control-Allow-Origin", "*");
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
  console.log(isPublic);

  const token = request.cookies.get("token")?.value || "";
  console.log(token, "Token");

  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/Auth/Signup", request.url));
  }

  // Allow the request to proceed
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Auth/Login", "/Auth/Signup", "/Auth/Verify-succes"],
};
