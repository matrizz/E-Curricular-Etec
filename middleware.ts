import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const protectedPaths = ["/admin", "/profile", "/curriculum/edit"]
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  const isAdminPath = pathname.startsWith("/admin")

  if (isProtectedPath) {
    const token = await getToken({ req: request })

    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", pathname)
      return NextResponse.redirect(url)
    }

    if (isAdminPath && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/curriculum/edit/:path*"],
}

