const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCategoryUpdate() {
  try {
    console.log('🧪 Test cập nhật category...\n');

    // Lấy category pets
    const petsCategory = await prisma.category.findUnique({
      where: { slug: 'pets' }
    });

    if (petsCategory) {
      console.log('📝 Category trước khi update:');
      console.log(`  - ID: ${petsCategory.id}`);
      console.log(`  - Name: ${petsCategory.name}`);
      console.log(`  - Description: ${petsCategory.description || 'null'}`);

      // Update description
      const updated = await prisma.category.update({
        where: { id: petsCategory.id },
        data: {
          description: 'Test description updated at ' + new Date().toISOString()
        }
      });

      console.log('\n✅ Category sau khi update:');
      console.log(`  - ID: ${updated.id}`);
      console.log(`  - Name: ${updated.name}`);
      console.log(`  - Description: ${updated.description}`);
    } else {
      console.log('❌ Không tìm thấy category pets');
    }

  } catch (error) {
    console.error('❌ Lỗi:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testCategoryUpdate();
