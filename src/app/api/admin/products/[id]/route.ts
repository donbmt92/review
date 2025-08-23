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
    const product = await db.product.findUnique({
      where: { id },
      include: {
        category: true,
        highlights: true,
        offers: true,
        reviewMeta: true
      }
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy thông tin sản phẩm' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const {
      title,
      imageUrl,
      score,
      categoryId,
      rank,
      badge,
      reviewsCount,
      boughtNote,
      discount,
      retailer,
      highlights,
      offers
    } = await request.json();

    // Check if product exists
    const existingProduct = await db.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    // Validation
    if (!title?.trim()) {
      return NextResponse.json(
        { message: 'Tên sản phẩm là bắt buộc', errors: { title: 'Tên sản phẩm là bắt buộc' } },
        { status: 400 }
      );
    }

    if (!imageUrl?.trim()) {
      return NextResponse.json(
        { message: 'URL hình ảnh là bắt buộc', errors: { imageUrl: 'URL hình ảnh là bắt buộc' } },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return NextResponse.json(
        { message: 'Danh mục là bắt buộc', errors: { categoryId: 'Danh mục là bắt buộc' } },
        { status: 400 }
      );
    }

    if (typeof score !== 'number' || score < 0 || score > 10) {
      return NextResponse.json(
        { message: 'Điểm phải từ 0 đến 10', errors: { score: 'Điểm phải từ 0 đến 10' } },
        { status: 400 }
      );
    }

    // Check if category exists
    const category = await db.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { message: 'Danh mục không tồn tại', errors: { categoryId: 'Danh mục không tồn tại' } },
        { status: 400 }
      );
    }

    // Check if rank is unique within category (if provided and changed)
    if (rank && (Number(rank) !== existingProduct.rank || categoryId !== existingProduct.categoryId)) {
      const existingRank = await db.product.findFirst({
        where: {
          categoryId,
          rank: Number(rank),
          NOT: { id }
        }
      });

      if (existingRank) {
        return NextResponse.json(
          { message: 'Hạng này đã tồn tại trong danh mục', errors: { rank: 'Hạng này đã tồn tại trong danh mục' } },
          { status: 400 }
        );
      }
    }

    // Update product using transaction
    const updatedProduct = await db.$transaction(async (tx) => {
      // Delete existing highlights and offers
      await tx.highlight.deleteMany({
        where: { productId: id }
      });

      await tx.offer.deleteMany({
        where: { productId: id }
      });

      // Update product with new data
      return await tx.product.update({
        where: { id },
        data: {
          title: title.trim(),
          imageUrl: imageUrl.trim(),
          score: Number(score),
          categoryId,
          rank: rank ? Number(rank) : null,
          badge: badge?.trim() || null,
          reviewsCount: reviewsCount ? Number(reviewsCount) : null,
          boughtNote: boughtNote?.trim() || null,
          discount: discount?.trim() || null,
          retailer: retailer?.trim() || null,
          highlights: {
            create: highlights?.filter((h: string) => h.trim()).map((text: string) => ({
              text: text.trim()
            })) || []
          },
          offers: {
            create: offers?.filter((o: any) => o.retailer?.trim() && o.url?.trim()).map((offer: any) => ({
              retailer: offer.retailer.trim(),
              url: offer.url.trim(),
              badge: offer.badge?.trim() || null,
              discount: offer.discount?.trim() || null,
            })) || []
          }
        },
        include: {
          category: true,
          highlights: true,
          offers: true
        }
      });
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { message: 'Lỗi khi cập nhật sản phẩm' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    // Check if product exists
    const product = await db.product.findUnique({
      where: { id }
    });

    if (!product) {
      return NextResponse.json(
        { message: 'Không tìm thấy sản phẩm' },
        { status: 404 }
      );
    }

    // Delete product (cascading deletes will handle related data)
    await db.product.delete({
      where: { id }
    });

    return NextResponse.json({ message: 'Xóa sản phẩm thành công' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { message: 'Lỗi khi xóa sản phẩm' },
      { status: 500 }
    );
  }
}
