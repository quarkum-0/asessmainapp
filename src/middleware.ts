import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    ? await getToken({ req: request })
    : { role: "unauthorized" };
    console.log(token);
    
    if (token.role === "unauthorized" && (request.nextUrl.pathname.startsWith("/user") || request.nextUrl.pathname.startsWith("/admin"))) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  // user
    if (request.nextUrl.pathname.startsWith("/user") && token.role !== "User") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    // administrator
    if (
      request.nextUrl.pathname.startsWith("/admin") &&
      token.role !== "Admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.log(error);
    
  }
  
}

export const config = {
  matcher: ["/",'/user', "/user/:path*", '/admin',"/admin/:path*"],
};
// 