import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set CORS headers to allow all origins
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
    });
  }
  const path = request.nextUrl.pathname;
  const ispublic =
    path === "/login" || path === "/Signup" || path === "/Auth/Verify-succes";

  const token = request.cookies.get("authjs.session-token")?.value || "";

  if (!ispublic && !token) {
    return NextResponse.redirect(new URL("/Signup", request.url));
  }

  // Allow the request to proceed for public paths
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/login", "/Signup", "/Auth/Verify-succes"],
};
