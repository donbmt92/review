import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import { airPurifiersData } from '../../../data/airPurifiersData';
import { steamCleanersData } from '../../../data/steamCleanersData';
import { vitaminD3K2Data } from '../../../data/vitaminD3K2Data';

interface StaticDataItem {
  rank?: number;
  title: string;
  image: string;
  highlights: string[];
  score: number;
  retailer?: string;
  url?: string;
  badge?: string;
  discount?: string;
  reviewsCount?: number;
  boughtNote?: string;
}

interface StaticData {
  category: string;
  categoryTitle: string;
  categoryDescription: string;
  items: StaticDataItem[];
}

export async function POST(request: NextRequest) {
  try {
    const details: string[] = [];
    let categoriesCreated = 0;
    let productsCreated = 0;
    let highlightsCreated = 0;
    let offersCreated = 0;

    // Data to import
    const dataToImport: StaticData[] = [
      airPurifiersData,
      steamCleanersData,
      vitaminD3K2Data
    ];

    // Map category slugs to icons
    const categoryIcons: Record<string, string> = {
      'air-purifiers': '🌬️',
      'steam-cleaners': '🧽',
      'vitamin-d3-k2': '💊'
    };

    for (const data of dataToImport) {
      details.push(`Đang xử lý danh mục: ${data.categoryTitle}`);

      // Create or update category
      const category = await db.category.upsert({
        where: { slug: data.category },
        update: {
          name: data.categoryTitle,
          icon: categoryIcons[data.category] || null
        },
        create: {
          name: data.categoryTitle,
          slug: data.category,
          icon: categoryIcons[data.category] || null
        }
      });

      categoriesCreated++;
      details.push(`✓ Danh mục "${category.name}" đã được tạo/cập nhật`);

      // Process products
      for (const item of data.items) {
        // Create or update product
        const existingProduct = await db.product.findFirst({
          where: {
            title: item.title,
            categoryId: category.id
          }
        });

        let product;
        if (existingProduct) {
          // Update existing product
          product = await db.product.update({
            where: { id: existingProduct.id },
            data: {
              imageUrl: item.image,
              score: item.score,
              rank: item.rank || null,
              badge: item.badge || null,
              reviewsCount: item.reviewsCount || null,
              boughtNote: item.boughtNote || null,
              discount: item.discount || null,
              retailer: item.retailer || null,
            }
          });

          // Delete existing highlights and offers
          await db.highlight.deleteMany({
            where: { productId: product.id }
          });
          await db.offer.deleteMany({
            where: { productId: product.id }
          });
        } else {
          // Create new product
          product = await db.product.create({
            data: {
              title: item.title,
              imageUrl: item.image,
              score: item.score,
              categoryId: category.id,
              rank: item.rank || null,
              badge: item.badge || null,
              reviewsCount: item.reviewsCount || null,
              boughtNote: item.boughtNote || null,
              discount: item.discount || null,
              retailer: item.retailer || null,
            }
          });
          productsCreated++;
        }

        // Create highlights
        for (const highlightText of item.highlights) {
          await db.highlight.create({
            data: {
              text: highlightText,
              productId: product.id
            }
          });
          highlightsCreated++;
        }

        // Create offer if URL exists
        if (item.url) {
          await db.offer.create({
            data: {
              retailer: item.retailer || 'unknown',
              url: item.url,
              badge: item.badge || null,
              discount: item.discount || null,
              productId: product.id
            }
          });
          offersCreated++;
        }

        details.push(`  ✓ Sản phẩm "${item.title}" (${item.highlights.length} highlights, ${item.url ? '1' : '0'} offer)`);
      }

      details.push(`✓ Hoàn thành danh mục "${data.categoryTitle}" với ${data.items.length} sản phẩm`);
    }

    // Final summary
    details.push('');
    details.push('🎉 IMPORT HOÀN TẤT!');
    details.push(`📊 Tổng kết:`);
    details.push(`  • ${categoriesCreated} danh mục đã được tạo/cập nhật`);
    details.push(`  • ${productsCreated} sản phẩm mới đã được tạo`);
    details.push(`  • ${highlightsCreated} highlights đã được tạo`);
    details.push(`  • ${offersCreated} offers đã được tạo`);

    return NextResponse.json({
      success: true,
      message: 'Import dữ liệu thành công!',
      details,
      stats: {
        categoriesCreated,
        productsCreated,
        highlightsCreated,
        offersCreated
      }
    });

  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Có lỗi xảy ra trong quá trình import',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
