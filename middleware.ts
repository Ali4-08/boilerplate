// \middleware.ts

import { NextResponse, NextRequest } from "next/server";
import type { ErrorType } from "./lib/types";
import { verifyToken } from "./lib/jwt";

export async function middleware(request: NextRequest) {
  const loginURL = new URL("/login", request.nextUrl);
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(loginURL);
  }

  try {
    await verifyToken(token);
    NextResponse.next();
  } catch (err) {
    const error = err as ErrorType;
    console.error(error.message);

    return NextResponse.redirect(loginURL);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/profile/:path*",
  ],
};
