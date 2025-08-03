import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  // Agar login yoki register bo‘lsa, token bo‘lsa — dashboardga o‘tkaz
  if ((pathname === "/Login" || pathname === "/Register") && token) {
    return NextResponse.redirect(new URL("/student/dashboard", request.url));
  }

  // Agar token yo‘q bo‘lsa va protected sahifaga kirsa — Login ga yubor
  const protectedRoutes = ["/student", "/teacher"];
  const isProtected = protectedRoutes.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/Login", request.url));
  }

  return NextResponse.next();
}

// Faqat shu yo‘llar uchun ishlaydi
export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/Login", "/Register"],
};
