import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Kiểm tra nếu đang truy cập admin panel
  if (pathname.startsWith('/admin')) {
    // Bỏ qua các API routes
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.next();
    }
    
    // Kiểm tra cookie xác thực
    const authCookie = request.cookies.get('admin-auth');
    
    if (!authCookie || authCookie.value !== 'authenticated') {
      // Nếu chưa xác thực, chuyển hướng đến trang đăng nhập
      if (pathname !== '/admin/login') {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
    } else {
      // Nếu đã xác thực và đang ở trang login, chuyển hướng về dashboard
      if (pathname === '/admin/login') {
        return NextResponse.redirect(new URL('/admin', request.url));
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
  ],
};
