import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const categories = await db.category.findMany({
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
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách danh mục' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Check if slug already exists
    const existingCategory = await db.category.findUnique({
      where: { slug: slug.trim() }
    });

    if (existingCategory) {
      return NextResponse.json(
        { message: 'Slug đã tồn tại', errors: { slug: 'Slug này đã được sử dụng' } },
        { status: 400 }
      );
    }

    // Check if name already exists
    const existingName = await db.category.findUnique({
      where: { name: name.trim() }
    });

    if (existingName) {
      return NextResponse.json(
        { message: 'Tên danh mục đã tồn tại', errors: { name: 'Tên danh mục này đã được sử dụng' } },
        { status: 400 }
      );
    }

    const category = await db.category.create({
      data: {
        name: name.trim(),
        slug: slug.trim(),
        icon: icon?.trim() || null,
        iconImage: iconImage?.trim() || null,
        parentId: parentId?.trim() || null,
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Lỗi khi tạo danh mục ', error: error },
      { status: 500 }
    );
  }
}
