import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
// `withAuth` augments your `Request` with the user's token.

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token);
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/auth/login") ||
      req.nextUrl.pathname.startsWith("/auth/register");
    if (isAuthPage && req.nextauth.token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (!isAuthPage && !req.nextauth.token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
    // if (isProtectedPage && !req.nextauth.token) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.email !== "",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard",
    "/hackathon/create",
    "/hackathon",
    "/hackathon/[id]",
    "/profile",
    "/auth/login",
    "/auth/register",
  ],
};
