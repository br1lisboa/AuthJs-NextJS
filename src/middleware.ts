import { NextResponse, type NextRequest } from "next/server";
import { auth } from "../auth";

// const publicPages = [];

export async function middleware(request: NextRequest) {
  const session = await auth();

  if (!session && request.nextUrl.pathname.startsWith("/private")) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
