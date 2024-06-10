import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Setting CORS headers
  response.headers.append(
    "Access-Control-Allow-Origin",
    "https://green-29u45vx8v-codewithharry35434gmailcoms-projects.vercel.app"
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
  console.log(path, "PATH");
  const isPublic =
    path === "/Auth/Login" ||
    path === "/Auth/Signup" ||
    path === "/Auth/Verify-succes";
  console.log(isPublic);

  const token = request.cookies.get("token")?.value || "";
  console.log(token, "Token");

  if (token) {
    console.log("ok");
    return NextResponse.rewrite(
      new URL(
        "https://green-29u45vx8v-codewithharry35434gmailcoms-projects.vercel.app/",
        request.url
      )
    );
  }

  if (!isPublic && !token) {
    console.log("ok by");
    return NextResponse.redirect(new URL("/Auth/Signup", request.url));
  }

  // Allow the request to proceed
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Auth/Login", "/Auth/Signup", "/Auth/Verify-succes"],
};
