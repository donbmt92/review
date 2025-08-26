import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: {
        category: true,
        highlights: true,
        offers: true,
        reviewMeta: true,
        _count: {
          select: {
            highlights: true,
            offers: true
          }
        }
      },
      orderBy: [
        { rank: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Lỗi khi lấy danh sách sản phẩm' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
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

    // Check if rank is unique within category (if provided)
    if (rank) {
      const existingRank = await db.product.findFirst({
        where: {
          categoryId,
          rank: Number(rank)
        }
      });

      if (existingRank) {
        return NextResponse.json(
          { message: 'Hạng này đã tồn tại trong danh mục', errors: { rank: 'Hạng này đã tồn tại trong danh mục' } },
          { status: 400 }
        );
      }
    }

    // Create product with related data
    const product = await db.product.create({
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
          create: highlights?.filter((h: any) => {
            if (typeof h === 'string') {
              return h.trim();
            } else if (h && typeof h === 'object' && h.text) {
              return h.text.trim();
            }
            return false;
          }).map((h: any) => ({
            text: typeof h === 'string' ? h.trim() : h.text.trim()
          })) || []
        },
        offers: {
          create: offers?.filter((o: any) => {
            if (o && typeof o === 'object') {
              return o.retailer?.trim();
            }
            return false;
          }).map((offer: any) => ({
            retailer: offer.retailer.trim(),
            url: offer.url?.trim() || 'https://amazon.com',
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

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Lỗi khi tạo sản phẩm' },
      { status: 500 }
    );
  }
}
