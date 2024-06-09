import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path);
  const ispublic =
    path === "/Auth/Login" ||
    path === "/Auth/Signup" ||
    path === "/Auth/Verify-succes";
  console.log(ispublic);

  const token = request.cookies.get("token")?.value || "";

  console.log(token, "Token");
  if (ispublic && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (!ispublic && !token) {
    return NextResponse.redirect(new URL("/Auth/Signup", request.url));
  }
  // Allow the request to proceed
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Auth/Login", "/Auth/Signup", "/Auth/Verify-succes"],
};
