const { PrismaClient } = require('@prisma/client');

async function testBackup() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Kiểm tra dữ liệu trong database production...');
    
    // Kiểm tra offers
    const offers = await prisma.offer.findMany({
      take: 5,
      include: {
        product: {
          select: {
            title: true
          }
        }
      }
    });
    
    console.log(`📦 Tổng số offers: ${await prisma.offer.count()}`);
    console.log('Một số offers mẫu:');
    offers.forEach(offer => {
      console.log(`- ${offer.retailer}: ${offer.url} (${offer.product.title})`);
    });
    
    // Kiểm tra highlights
    const highlights = await prisma.highlight.findMany({
      take: 5,
      include: {
        product: {
          select: {
            title: true
          }
        }
      }
    });
    
    console.log(`\n✨ Tổng số highlights: ${await prisma.highlight.count()}`);
    console.log('Một số highlights mẫu:');
    highlights.forEach(highlight => {
      console.log(`- ${highlight.text.substring(0, 50)}... (${highlight.product.title})`);
    });
    
    // Kiểm tra reviewMeta
    const reviewMeta = await prisma.reviewMeta.findMany({
      take: 3,
      include: {
        product: {
          select: {
            title: true
          }
        }
      }
    });
    
    console.log(`\n📊 Tổng số reviewMeta: ${await prisma.reviewMeta.count()}`);
    console.log('Một số reviewMeta mẫu:');
    reviewMeta.forEach(meta => {
      console.log(`- Reviews: ${meta.reviewsCount}, Bought: ${meta.boughtNote} (${meta.product.title})`);
    });
    
    // Kiểm tra newsletter subscriptions
    const newsletterCount = await prisma.newsletterSubscription.count();
    console.log(`\n📧 Newsletter subscriptions: ${newsletterCount}`);
    
  } catch (error) {
    console.error('❌ Lỗi kiểm tra:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testBackup();
