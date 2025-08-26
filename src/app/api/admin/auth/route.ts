import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    
    // Lấy thông tin đăng nhập từ env
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
    
    
    
    // Kiểm tra thông tin đăng nhập
    if (username === adminUsername && password === adminPassword) {
      const response = NextResponse.json({ 
        success: true, 
        message: 'Đăng nhập thành công' 
      });
      
      // Set cookie xác thực (30 ngày)
      response.cookies.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 // 30 ngày
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi xác thực' },
      { status: 500 }
    );
  }
}
