import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../../lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { id: categoryId } = await params;

    // Validate category exists
    const category = await db.category.findUnique({
      where: { id: categoryId }
    });

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Lưu content vào bảng CategoryContent
    const categoryContent = await db.categoryContent.upsert({
      where: { categoryId },
      update: {
        // SEO & Meta
        customTitle: body.customTitle || null,
        customDescription: body.customDescription || null,
        customBreadcrumb: body.customBreadcrumb || null,
        
        // Content
        overviewTitle: body.overviewTitle || null,
        overviewParagraphs: body.overviewParagraphs || null,
        
        topProductsTitle: body.topProductsTitle || null,
        topProductsParagraphs: body.topProductsParagraphs || null,
        
        // FAQ
        faqItems: body.faqItems || null,
        
        // Keywords & SEO
        keywords: body.keywords || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
        
        updatedAt: new Date()
      },
      create: {
        categoryId,
        // SEO & Meta
        customTitle: body.customTitle || null,
        customDescription: body.customDescription || null,
        customBreadcrumb: body.customBreadcrumb || null,
        
        // Content
        overviewTitle: body.overviewTitle || null,
        overviewParagraphs: body.overviewParagraphs || null,
        
        topProductsTitle: body.topProductsTitle || null,
        topProductsParagraphs: body.topProductsParagraphs || null,
        
        // FAQ
        faqItems: body.faqItems || null,
        
        // Keywords & SEO
        keywords: body.keywords || null,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null
      }
    });

    return NextResponse.json({ 
      message: 'Content saved successfully to CategoryContent',
      categoryId,
      categoryName: category.name,
      categoryContent
    });

  } catch (error) {
    console.error('Error saving category content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: categoryId } = await params;

    // Lấy data từ category và categoryContent
    const [category, categoryContent] = await Promise.all([
      db.category.findUnique({
        where: { id: categoryId }
      }),
      db.categoryContent.findUnique({
        where: { categoryId }
      })
    ]);

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      categoryId: category.id,
      category: category,
      categoryContent: categoryContent || null
    });

  } catch (error) {
    console.error('Error fetching category content:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
