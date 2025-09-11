import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Tạo parent categories trước
  const parentCategories = [
    {
      name: 'Home & Kitchen',
      slug: 'home-kitchen',
      icon: '🏠',
      iconImage: null
    },
    {
      name: 'Electronics',
      slug: 'electronics',
      icon: '📱',
      iconImage: null
    },
    {
      name: 'Health & Beauty',
      slug: 'health-beauty',
      icon: '🏥',
      iconImage: null
    },
    {
      name: 'Sports & Fitness',
      slug: 'sports-fitness',
      icon: '⚽',
      iconImage: null
    }
  ]

  // Tạo sub categories
  const subCategories = [
    // Home & Kitchen sub categories
    {
      name: 'Air Purifiers',
      slug: 'air-purifiers',
      icon: '💨',
      iconImage: null,
      parentSlug: 'home-kitchen'
    },
    {
      name: 'Vacuum Cleaners',
      slug: 'vacuum-cleaners',
      icon: '🧹',
      iconImage: null,
      parentSlug: 'home-kitchen'
    },
    {
      name: 'Kitchen Appliances',
      slug: 'kitchen-appliances',
      icon: '🍳',
      iconImage: null,
      parentSlug: 'home-kitchen'
    },
    // Electronics sub categories
    {
      name: 'Smartphones',
      slug: 'smartphones',
      icon: '📱',
      iconImage: null,
      parentSlug: 'electronics'
    },
    {
      name: 'Laptops',
      slug: 'laptops',
      icon: '💻',
      iconImage: null,
      parentSlug: 'electronics'
    },
    // Health & Beauty sub categories
    {
      name: 'Vitamins & Supplements',
      slug: 'vitamins-supplements',
      icon: '💊',
      iconImage: null,
      parentSlug: 'health-beauty'
    },
    {
      name: 'Skincare',
      slug: 'skincare',
      icon: '🧴',
      iconImage: null,
      parentSlug: 'health-beauty'
    },
    // Sports & Fitness sub categories
    {
      name: 'Fitness Equipment',
      slug: 'fitness-equipment',
      icon: '🏋️',
      iconImage: null,
      parentSlug: 'sports-fitness'
    },
    {
      name: 'Outdoor Gear',
      slug: 'outdoor-gear',
      icon: '🏕️',
      iconImage: null,
      parentSlug: 'sports-fitness'
    }
  ]

  console.log('📁 Tạo parent categories...')
  const createdParents = new Map()
  
  for (const parent of parentCategories) {
    const created = await prisma.category.upsert({
      where: { slug: parent.slug },
      update: {},
      create: parent
    })
    createdParents.set(parent.slug, created.id)
    console.log(`✅ Đã tạo parent category: ${parent.name}`)
  }

  console.log('📁 Tạo sub categories...')
  for (const sub of subCategories) {
    const parentId = createdParents.get(sub.parentSlug)
    if (!parentId) {
      console.error(`❌ Không tìm thấy parent category: ${sub.parentSlug}`)
      continue
    }

    const { parentSlug, ...subData } = sub
    await prisma.category.upsert({
      where: { slug: sub.slug },
      update: {},
      create: {
        ...subData,
        parentId: parentId
      }
    })
    console.log(`✅ Đã tạo sub category: ${sub.name} (parent: ${sub.parentSlug})`)
  }

  // Tạo products mẫu
  const products = [
    {
      title: 'Máy lọc không khí PuroAir 1115',
      imageUrl: '/air-purifier.webp',
      score: 9.5,
      categorySlug: 'air-purifiers',
      rank: 1,
      badge: 'Best Overall',
      reviewsCount: 13721,
      boughtNote: '9K+ bought in past month',
      discount: '20% off',
      retailer: 'amazon',
      highlights: [
        'Covers large areas effectively up to 1,115 sq ft',
        'HEPA-13 filter removes 99.97% of particles',
        'Smart sensor technology for automatic operation',
        'Whisper-quiet operation at 25dB'
      ],
      offers: [
        {
          retailer: 'amazon',
          url: 'https://amazon.com/puroair-1115',
          badge: 'Best Seller',
          discount: '20% off'
        }
      ]
    },
    {
      title: 'Máy hút bụi robot iRobot Roomba j7+',
      imageUrl: '/pool-cleaner.webp',
      score: 9.2,
      categorySlug: 'vacuum-cleaners',
      rank: 1,
      badge: 'Smart Choice',
      reviewsCount: 8923,
      boughtNote: '5K+ bought in past month',
      discount: '15% off',
      retailer: 'amazon',
      highlights: [
        'Self-emptying base with 60-day capacity',
        'AI-powered obstacle avoidance',
        'Maps your home for efficient cleaning',
        'Works with Alexa and Google Assistant'
      ],
      offers: [
        {
          retailer: 'amazon',
          url: 'https://amazon.com/irobot-roomba-j7',
          badge: 'Prime',
          discount: '15% off'
        }
      ]
    }
  ]

  console.log('📦 Tạo products...')
  for (const product of products) {
    const { highlights, offers, categorySlug, ...productData } = product
    
    // Tìm categoryId từ slug
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug }
    });

    if (!category) {
      console.error(`❌ Không tìm thấy category: ${categorySlug}`);
      continue;
    }
    
    // Kiểm tra product có tồn tại không trước khi tạo
    const existingProduct = await prisma.product.findFirst({
      where: { title: productData.title }
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          ...productData,
          categoryId: category.id,
          highlights: {
            create: highlights.map(text => ({ text }))
          },
          offers: {
            create: offers
          }
        }
      });
      console.log(`✅ Đã tạo product: ${productData.title} (category: ${categorySlug})`);
    } else {
      console.log(`⏭️ Product đã tồn tại: ${productData.title}`);
    }
  }

  console.log('✅ Seed database hoàn thành!')
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
