import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../lib/db';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const category = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true, children: true }
        },
        parent: {
          select: { id: true, name: true, slug: true }
        },
        children: {
          select: { id: true, name: true, slug: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Không tìm thấy danh mục' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy thông tin danh mục' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { name, slug, icon, iconImage, parentId } = await request.json();

    // Validation
    if (!name?.trim()) {
      return NextResponse.json(
        { message: 'Tên danh mục là bắt buộc', errors: { name: 'Tên danh mục là bắt buộc' } },
        { status: 400 }
      );
    }

    if (!slug?.trim()) {
      return NextResponse.json(
        { message: 'Slug là bắt buộc', errors: { slug: 'Slug là bắt buộc' } },
        { status: 400 }
      );
    }

    // Check if category exists
    const existingCategory = await db.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return NextResponse.json(
        { message: 'Không tìm thấy danh mục' },
        { status: 400 }
      );
    }

    // Check if slug already exists (excluding current category)
    const duplicateSlug = await db.category.findFirst({
      where: { 
        slug: slug.trim(),
        NOT: { id }
      }
    });

    if (duplicateSlug) {
      return NextResponse.json(
        { message: 'Slug đã tồn tại', errors: { slug: 'Slug này đã được sử dụng' } },
        { status: 400 }
      );
    }

    // Check if name already exists (excluding current category)
    const duplicateName = await db.category.findFirst({
      where: { 
        name: name.trim(),
        NOT: { id }
      }
    });

    if (duplicateName) {
      return NextResponse.json(
        { message: 'Tên danh mục đã tồn tại', errors: { name: 'Tên danh mục này đã được sử dụng' } },
        { status: 400 }
      );
    }

    const updatedCategory = await db.category.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: slug.trim(),
        icon: icon?.trim() || null,
        iconImage: iconImage?.trim() || null,
        parentId: parentId?.trim() || null,
      }
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { message: 'Lỗi khi cập nhật danh mục' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Check if category exists
    const category = await db.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: { products: true }
        }
      }
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Không tìm thấy danh mục' },
        { status: 404 }
      );
    }

    // Check if category has products or children
    if (category._count.products > 0) {
      return NextResponse.json(
        { message: 'Không thể xóa danh mục có sản phẩm. Hãy xóa hoặc chuyển sản phẩm sang danh mục khác trước.' },
        { status: 400 }
      );
    }

    if (category._count.children > 0) {
      return NextResponse.json(
        { message: 'Không thể xóa danh mục có sub-categories. Hãy xóa hoặc chuyển sub-categories trước.' },
        { status: 400 }
      );
    }

    await db.category.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Xóa danh mục thành công' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { message: 'Lỗi khi xóa danh mục' },
      { status: 500 }
    );
  }
}
