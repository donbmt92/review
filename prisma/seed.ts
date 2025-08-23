import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Bắt đầu seed database...')

  // Tạo categories mẫu
  const categories = [
    {
      name: 'Máy lọc không khí',
      slug: 'air-purifiers',
      icon: '💨',
      iconImage: null
    },
    {
      name: 'Máy hút bụi',
      slug: 'vacuum-cleaners',
      icon: '🧹',
      iconImage: null
    },
    {
      name: 'Điện tử',
      slug: 'electronics',
      icon: '📱',
      iconImage: null
    },
    {
      name: 'Nhà bếp',
      slug: 'home-kitchen',
      icon: '🍳',
      iconImage: null
    },
    {
      name: 'Sức khỏe',
      slug: 'health',
      icon: '🏥',
      iconImage: null
    },
    {
      name: 'Thể thao',
      slug: 'sports',
      icon: '⚽',
      iconImage: null
    },
    {
      name: 'Làm vườn',
      slug: 'garden',
      icon: '🌱',
      iconImage: null
    },
    {
      name: 'Văn phòng',
      slug: 'office',
      icon: '💼',
      iconImage: null
    }
  ]

  console.log('📁 Tạo categories...')
  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  // Tạo products mẫu
  const products = [
    {
      title: 'Máy lọc không khí PuroAir 1115',
      imageUrl: '/air-purifier.webp',
      score: 9.5,
      categoryId: 'air-purifiers',
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
      categoryId: 'vacuum-cleaners',
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
    const { highlights, offers, ...productData } = product
    
    // Kiểm tra product có tồn tại không trước khi tạo
    const existingProduct = await prisma.product.findFirst({
      where: { title: productData.title }
    });

    if (!existingProduct) {
      await prisma.product.create({
        data: {
          ...productData,
          highlights: {
            create: highlights.map(text => ({ text }))
          },
          offers: {
            create: offers
          }
        }
      });
      console.log(`✅ Đã tạo product: ${productData.title}`);
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
