const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCategories() {
  try {
    console.log('🔍 Đang test database connection...');
    
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test categories query
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' }
    });
    
    console.log('📊 Categories found:', categories.length);
    console.log('📋 Categories:', categories);
    
    // Test specific category
    if (categories.length > 0) {
      const firstCategory = categories[0];
      console.log('🎯 First category:', firstCategory);
      
      // Test products in category
      const productsInCategory = await prisma.product.findMany({
        where: { categoryId: firstCategory.id }
      });
      console.log('🛍️ Products in first category:', productsInCategory.length);
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCategories();
