import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../lib/db';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra authentication (có thể thêm middleware sau)
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Tạo timestamp cho tên file backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `backup-${timestamp}.json`;
    
    // Đường dẫn thư mục backup
    const backupDir = path.join(process.cwd(), 'backups');
    
    // Tạo thư mục backup nếu chưa tồn tại
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Lấy tất cả dữ liệu từ database
    const [categories, products, offers, highlights, reviewMeta, newsletterSubscriptions] = await Promise.all([
      db.category.findMany({
        include: {
          products: true,
          content: true
        }
      }),
      db.product.findMany({
        include: {
          category: true,
          offers: true,
          highlights: true,
          reviewMeta: true
        }
      }),
      db.offer.findMany(),
      db.highlight.findMany(),
      db.reviewMeta.findMany(),
      db.newsletterSubscription.findMany()
    ]);

    // Tạo object backup
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '1.0',
      data: {
        categories,
        products,
        offers,
        highlights,
        reviewMeta,
        newsletterSubscriptions
      },
      metadata: {
        categoriesCount: categories.length,
        productsCount: products.length,
        offersCount: offers.length,
        highlightsCount: highlights.length,
        reviewMetaCount: reviewMeta.length,
        newsletterSubscriptionsCount: newsletterSubscriptions.length,
        totalRecords: categories.length + products.length + offers.length + highlights.length + reviewMeta.length + newsletterSubscriptions.length
      }
    };

    // Ghi file backup
    const backupPath = path.join(backupDir, backupFileName);
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2));

    // Lấy danh sách các file backup hiện có
    const backupFiles = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .sort()
      .reverse(); // Sắp xếp từ mới nhất đến cũ nhất

    // Giới hạn số lượng backup (giữ lại 10 file gần nhất)
    const maxBackups = 10;
    if (backupFiles.length > maxBackups) {
      const filesToDelete = backupFiles.slice(maxBackups);
      filesToDelete.forEach(file => {
        const filePath = path.join(backupDir, file);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Backup thành công',
      backupFile: backupFileName,
      backupPath: backupPath,
      metadata: backupData.metadata,
      totalBackups: backupFiles.length
    });

  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lỗi khi tạo backup',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Kiểm tra authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Đường dẫn thư mục backup
    const backupDir = path.join(process.cwd(), 'backups');
    
    if (!fs.existsSync(backupDir)) {
      return NextResponse.json({
        success: true,
        backups: [],
        message: 'Chưa có backup nào'
      });
    }

    // Lấy danh sách các file backup
    const backupFiles = fs.readdirSync(backupDir)
      .filter(file => file.startsWith('backup-') && file.endsWith('.json'))
      .map(file => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        
        // Đọc metadata từ file backup
        let metadata = null;
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const backupData = JSON.parse(content);
          metadata = backupData.metadata;
        } catch (error) {
          console.error('Error reading backup metadata:', error);
        }

        return {
          fileName: file,
          filePath: filePath,
          size: stats.size,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
          metadata: metadata
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      backups: backupFiles,
      totalBackups: backupFiles.length
    });

  } catch (error) {
    console.error('Get backups error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lỗi khi lấy danh sách backup',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}
