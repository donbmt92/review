import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ 
      success: true, 
      message: 'Đăng xuất thành công' 
    });
    
    // Xóa cookie xác thực
    response.cookies.set('admin-auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Lỗi đăng xuất' },
      { status: 500 }
    );
  }
}
