import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function POST() {
  try {
    // 1. Kiểm tra xem danh mục Pets đã tồn tại chưa
    let petsCategory = await db.category.findUnique({
      where: { slug: 'pets' }
    });

    if (!petsCategory) {
      // Tạo mới nếu chưa có
      petsCategory = await db.category.create({
        data: {
          name: 'Pets',
          slug: 'pets',
          icon: '🐕',
        }
      });
      console.log('Đã tạo danh mục Pets mới:', petsCategory);
    } else {
      console.log('Danh mục Pets đã tồn tại:', petsCategory);
      
      // Xóa tất cả dữ liệu cũ trong danh mục này
      const oldProducts = await db.product.findMany({
        where: { categoryId: petsCategory.id },
        select: { id: true }
      });
      
      if (oldProducts.length > 0) {
        const productIds = oldProducts.map(p => p.id);
        
        // Xóa highlights, offers, review metadata trước
        await db.highlight.deleteMany({
          where: { productId: { in: productIds } }
        });
        await db.offer.deleteMany({
          where: { productId: { in: productIds } }
        });
        await db.reviewMeta.deleteMany({
          where: { productId: { in: productIds } }
        });
        
        // Sau đó xóa sản phẩm
        await db.product.deleteMany({
          where: { categoryId: petsCategory.id }
        });
      }
      console.log('Đã xóa dữ liệu cũ trong danh mục Pets');
    }

    // 2. Tạo các sản phẩm thú cưng
    const products = [
      {
        title: 'Royal Canin Adult Dog Food',
        imageUrl: '/categories/pets.png',
        score: 9.2,
        categoryId: petsCategory.id,
        rank: 1,
        badge: 'Best Overall',
        reviewsCount: 1250,
        boughtNote: '10K+ bought in past month',
        discount: 'Save 15%',
        retailer: 'Amazon',
        list: {
          pros: ['Chất lượng cao', 'Phù hợp mọi lứa tuổi', 'Giá tốt'],
          cons: ['Hơi đắt', 'Cần thời gian thích nghi']
        }
      },
      {
        title: 'Frisco Cat Scratching Post',
        imageUrl: '/categories/pets.png',
        score: 8.8,
        categoryId: petsCategory.id,
        rank: 2,
        badge: 'Best Value',
        reviewsCount: 890,
        boughtNote: '5K+ bought in past month',
        discount: 'Save 20%',
        retailer: 'Chewy',
        list: {
          pros: ['Giá rẻ', 'Dễ lắp ráp', 'Mèo thích'],
          cons: ['Chất liệu trung bình', 'Không bền lắm']
        }
      },
      {
        title: 'PetSafe Wireless Dog Fence',
        imageUrl: '/categories/pets.png',
        score: 9.0,
        categoryId: petsCategory.id,
        rank: 3,
        badge: 'Premium Choice',
        reviewsCount: 650,
        boughtNote: '2K+ bought in past month',
        discount: 'Free shipping',
        retailer: 'PetSmart',
        list: {
          pros: ['Công nghệ tiên tiến', 'Dễ sử dụng', 'Hiệu quả cao'],
          cons: ['Giá cao', 'Cần thời gian huấn luyện']
        }
      },
      {
        title: 'Kong Classic Dog Toy',
        imageUrl: '/categories/pets.png',
        score: 8.5,
        categoryId: petsCategory.id,
        rank: 4,
        badge: 'Popular',
        reviewsCount: 2100,
        boughtNote: '15K+ bought in past month',
        discount: 'Buy 2 Get 1 Free',
        retailer: 'Amazon',
        list: {
          pros: ['Bền bỉ', 'An toàn cho chó', 'Giá hợp lý'],
          cons: ['Một số chó không thích', 'Có thể bị nhai nát']
        }
      },
      {
        title: 'Arm & Hammer Cat Litter',
        imageUrl: '/categories/pets.png',
        score: 8.7,
        categoryId: petsCategory.id,
        rank: 5,
        badge: 'Best Seller',
        reviewsCount: 1800,
        boughtNote: '20K+ bought in past month',
        discount: 'Save 25%',
        retailer: 'Walmart',
        list: {
          pros: ['Khử mùi tốt', 'Giá rẻ', 'Dễ tìm'],
          cons: ['Bụi nhiều', 'Cần thay thường xuyên']
        }
      }
    ];

    const createdProducts = [];

    // Tạo từng sản phẩm
    for (const productData of products) {
      const product = await db.product.create({
        data: {
          title: productData.title,
          imageUrl: productData.imageUrl,
          score: productData.score,
          categoryId: productData.categoryId,
          rank: productData.rank,
          badge: productData.badge,
          reviewsCount: productData.reviewsCount,
          boughtNote: productData.boughtNote,
          discount: productData.discount,
          retailer: productData.retailer,
          list: productData.list
        }
      });

      createdProducts.push(product);

      // Tạo highlights cho sản phẩm
      if (productData.list?.pros) {
        for (const highlight of productData.list.pros) {
          await db.highlight.create({
            data: {
              text: highlight,
              productId: product.id
            }
          });
        }
      }

      // Tạo offers cho sản phẩm
      await db.offer.create({
        data: {
          retailer: productData.retailer,
          url: `https://${productData.retailer.toLowerCase()}.com/search?q=${encodeURIComponent(productData.title)}`,
          badge: productData.discount,
          discount: productData.discount,
          productId: product.id
        }
      });

      // Tạo review metadata
      await db.reviewMeta.create({
        data: {
          reviewsCount: productData.reviewsCount,
          boughtNote: productData.boughtNote,
          productId: product.id
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Đã tạo xong dữ liệu cho danh mục Pets!',
      data: {
        category: petsCategory,
        products: createdProducts,
        totalProducts: createdProducts.length
      }
    });

  } catch (error) {
    console.error('❌ Lỗi khi tạo dữ liệu:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lỗi khi tạo dữ liệu',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
