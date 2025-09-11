import { db } from './db';
import { CompareItem } from '../components/CompareRow';

export interface ProductPageData {
  category: string;
  categoryTitle: string;
  categoryDescription: string;
  updatedDate: string;
  breadcrumbPath: string;
  items: CompareItem[];
  subCategories?: Array<{
    id: string;
    name: string;
    slug: string;
    productCount: number;
    icon?: string;
    iconImage?: string;
  }>;
  parentCategory?: {
    id: string;
    name: string;
    slug: string;
  };
  overviewContent: {
    title: string;
    paragraphs: string[];
  };
  topProductsContent: {
    title: string;
    paragraphs: string[];
  };
  faqItems: {
    question: string;
    answer: string;
  }[];
  // SEO fields
  keywords?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export async function getProductPageData(categorySlug: string): Promise<ProductPageData | null> {
  try {
    // Get category with products, children, parent and content
    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      include: {
        products: {
          include: {
            highlights: true,
            offers: true,
            reviewMeta: true,
          },
          orderBy: [
            { rank: 'asc' },
            { createdAt: 'desc' }
          ]
        },
        children: {
          include: {
            _count: {
              select: { products: true }
            }
          },
          orderBy: { name: 'asc' }
        },
        parent: {
          select: { id: true, name: true, slug: true }
        },
        content: true // Lấy CategoryContent
      }
    });

    if (!category) {
      return null;
    }

    // If this is a parent category with children, show sub-categories instead of products
    if (!category.parentId && category.children.length > 0) {
      return generateParentCategoryData(category, categorySlug);
    }

    // If this is a sub-category or parent category without children, show products
    if (category.products.length === 0) {
      return null;
    }

    // Convert database products to CompareItem format
    const items: CompareItem[] = category.products.map(product => ({
      rank: product.rank || 0,
      title: product.title,
      image: product.imageUrl,
      highlights: product.highlights.map(h => h.text),
      score: product.score,
      retailer: product.retailer || 'amazon',
      url: product.offers[0]?.url || '#',
      badge: product.badge || undefined,
      discount: product.discount || undefined,
      reviewsCount: product.reviewsCount || undefined,
      boughtNote: product.boughtNote || undefined,
      id: product.id,
    }));

    // Generate dynamic content based on category - Use custom content if available
    const categoryTitle = category.content?.customTitle || generateCategoryTitle(categorySlug, category.name, items.length);
    const categoryDescription = category.content?.customDescription || generateCategoryDescription(categorySlug, category.name);
    const breadcrumbPath = category.content?.customBreadcrumb || generateBreadcrumbPath(categorySlug, category.name);

    // Generate overview content - Use CategoryContent if available
    const overviewTitle = category.content?.overviewTitle || `Overview of ${category.name}`;
    const overviewParagraphs = (category.content?.overviewParagraphs as string[]) || generateOverviewContent(categorySlug, category.name);

    // Generate top products content - Use CategoryContent if available
    const topProductsTitle = category.content?.topProductsTitle || `Top ${category.name}`;
    const topProductsParagraphs = (category.content?.topProductsParagraphs as string[]) || generateTopProductsContent(categorySlug, category.name);

    // Generate FAQ content - Use CategoryContent if available
    const faqItems = (category.content?.faqItems as Array<{question: string; answer: string}>) || generateFAQContent(categorySlug, category.name);

    return {
      category: categorySlug,
      categoryTitle: categoryTitle,
      categoryDescription: categoryDescription,
      updatedDate: category.content?.updatedAt ? 
        new Date(category.content.updatedAt).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }) : 
        new Date().toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
      breadcrumbPath: breadcrumbPath,
      items,
      parentCategory: category.parent ? {
        id: category.parent.id,
        name: category.parent.name,
        slug: category.parent.slug
      } : undefined,
      overviewContent: {
        title: overviewTitle,
        paragraphs: overviewParagraphs
      },
      topProductsContent: {
        title: topProductsTitle,
        paragraphs: topProductsParagraphs
      },
      faqItems,
      // SEO fields from CategoryContent
      keywords: category.content?.keywords || undefined,
      metaTitle: category.content?.metaTitle || undefined,
      metaDescription: category.content?.metaDescription || undefined
    };

  } catch (error) {
    console.error('Error getting product page data:', error);
    return null;
  }
}

function generateOverviewContent(categorySlug: string, categoryName: string): string[] {
  const contentMap: Record<string, string[]> = {
    'air-purifiers': [
      "Air purifiers have become essential household appliances for those looking to improve indoor air quality, especially in environments prone to dust, mold, and other allergens. These devices are designed to remove contaminants from the air, making them beneficial for individuals with allergies, asthma, or those who simply wish to breathe cleaner air.",
      "Choosing the right air purifier can depend on several factors. For instance, if you are dealing with mold issues, you might want a device specifically designed as an air purifier for mold. These models typically include specialized filters or technologies to capture mold spores effectively.",
      "Portable air purifiers are perfect for individuals who need flexibility. Whether you're moving between rooms or traveling, these lightweight models provide convenience without sacrificing performance. For larger spaces, a large air purifier with a robust air filter system can cover a wide area, ensuring comprehensive air cleaning."
    ],
    'steam-cleaners': [
      "Steam cleaners have revolutionized home cleaning by using the power of steam to sanitize and deep clean various surfaces. These versatile machines use high-temperature steam to break down dirt, grease, and grime while killing bacteria and germs without the need for harsh chemicals.",
      "Modern steam cleaners come in various forms, from handheld units for quick spot cleaning to full-size floor models for comprehensive home cleaning. They're particularly effective on hard surfaces like tile, hardwood, and laminate floors, but many models also include attachments for cleaning upholstery, windows, and other household items.",
      "The key advantage of steam cleaning is its eco-friendly nature. By using only water and heat, steam cleaners eliminate the need for chemical cleaners while providing superior sanitization. This makes them ideal for households with children, pets, or allergy sufferers who need a chemical-free cleaning solution."
    ],
    'vitamin-d3-k2': [
      "Vitamin D3 and K2 are often hailed as a dynamic duo in the world of dietary supplements, and for good reason. Many people seek out vitamin D3 K2 supplements due to their potential health benefits. Vitamin D3 is crucial for maintaining optimal bone health as it aids in the absorption of calcium.",
      "For those who struggle to get adequate sunlight exposure, which is a natural source of vitamin D, or have dietary restrictions that limit their intake of vitamin K2-rich foods, supplements can be an excellent alternative. Vitamin D3 K2 supplements are typically sought after by individuals looking to bolster their immune system, improve cardiovascular health, and support overall bone health."
    ],
    'pets': [
      "Pet products have become essential for modern pet care, offering everything from nutrition to entertainment and safety. These products are designed to meet the diverse needs of different pets, whether you have dogs, cats, or other companion animals.",
      "Choosing the right pet products involves considering factors such as your pet's age, size, breed, and specific health requirements. Quality pet food, toys, and accessories can significantly impact your pet's health, happiness, and overall well-being.",
      "Modern pet products combine innovation with safety, ensuring that your beloved companions receive the best care possible. From premium food formulations to durable toys and grooming essentials, there's a wide range of options to suit every pet and owner preference."
    ]
  };

  return contentMap[categorySlug] || generateGenericOverviewContent(categoryName);
}

function generateGenericOverviewContent(categoryName: string): string[] {
  const displayName = categoryName.replace(/^\d+\s+/, '').toLowerCase();
  
  return [
    `${categoryName} have become increasingly popular due to their effectiveness and versatility. These products are designed to meet various needs and preferences, making them suitable for a wide range of users.`,
    `When choosing the right ${displayName}, it's important to consider factors such as quality, features, and value for money. Our comprehensive comparison helps you make an informed decision based on expert analysis and user reviews.`,
    `The best ${displayName} combine innovative technology with user-friendly design, ensuring optimal performance and satisfaction. Whether you're a beginner or an expert, you'll find options that suit your specific requirements.`
  ];
}

function generateTopProductsContent(categorySlug: string, categoryName: string): string[] {
  const contentMap: Record<string, string[]> = {
    'air-purifiers': [
      "Customer feedback on air purifiers is generally positive, highlighting several benefits and versatile uses. Many users report a noticeable reduction in allergy symptoms, such as sneezing and coughing, once they start using an air purifier for the room where they spend the most time.",
      "For those who suffer from mold allergies, customers have praised air purifiers specifically designed to combat mold, noting a significant decrease in mold-related odors and respiratory issues. Similarly, large air purifiers have been commended for their ability to efficiently clean the air in open-plan homes or offices.",
      "Portable air purifiers have received favorable reviews from travelers and those living in small apartments or dorms. These users appreciate the compact design and ease of moving the unit from one location to another, ensuring they have clean air wherever they go.",
      "Overall, the impact of using an air purifier can be profound, improving not just air quality but also the quality of life. Whether for reducing dust, managing mold, or simply maintaining a clean and fresh home environment, air purifiers are a valuable investment for health-conscious individuals."
    ],
    'steam-cleaners': [
      "Customer reviews consistently highlight the effectiveness of steam cleaners in removing stubborn stains and odors that traditional cleaning methods often miss. Users particularly appreciate the deep cleaning capabilities on kitchen floors and bathroom tiles, where grease and soap scum can be challenging to remove.",
      "Many customers report significant time savings with steam cleaners, as the steam penetrates deep into surfaces and loosens dirt, making it easier to wipe away. The sanitizing properties are also highly valued, especially in homes with young children or during flu season.",
      "Portability and ease of use are frequently mentioned in positive reviews. Modern steam cleaners are designed with user comfort in mind, featuring ergonomic handles, easy-fill water tanks, and quick heat-up times. The variety of attachments available also allows users to tackle multiple cleaning tasks with a single machine.",
      "Overall, steam cleaner users report higher satisfaction with their home cleanliness and appreciate the chemical-free approach to maintaining a healthy living environment."
    ],
    'vitamin-d3-k2': [
      "Many users of vitamin D3 K2 supplements have shared positive feedback regarding their experiences. Customers often report improvements in their bone density, noting that regular use of these supplements has helped them maintain stronger bones and reduce the risk of fractures.",
      "The combination of vitamins D3 and K2 is praised for its synergistic effects, with users appreciating the way these two vitamins work together to maximize health benefits. Besides bone health, many people have observed an overall boost in their immune system, experiencing fewer colds and illnesses.",
      "Another commonly mentioned benefit is improved cardiovascular health. Customers have reported better heart health metrics after incorporating these supplements into their routine. This is often linked to vitamin K2's role in preventing calcium build-up in the arteries.",
      "Vitamin D3 K2 supplements are versatile, catering to a wide range of health needs. They are available in various forms, including capsules, tablets, and liquid drops, making them accessible for different preferences and lifestyles."
    ],
    'pets': [
      "Pet owners consistently praise the quality and effectiveness of premium pet products, noting significant improvements in their pets' health and happiness. Many customers report that their pets show immediate preference for high-quality food and toys.",
      "The durability and safety of top-rated pet products are frequently highlighted in customer reviews. Users appreciate products that can withstand their pets' natural behaviors while maintaining safety standards, especially for toys and accessories.",
      "Customer feedback emphasizes the importance of choosing products that match their pets' specific needs and preferences. Whether it's food formulated for different life stages or toys designed for specific breeds, personalization is key to satisfaction.",
      "Overall, pet owners report higher satisfaction with premium pet products, noting that the investment in quality often results in better long-term outcomes for their beloved companions."
    ]
  };

  return contentMap[categorySlug] || generateGenericTopProductsContent(categoryName);
}

function generateGenericTopProductsContent(categoryName: string): string[] {
  const displayName = categoryName.replace(/^\d+\s+/, '').toLowerCase();
  
  return [
    `Customer reviews for ${displayName} are consistently positive, with users highlighting their effectiveness and reliability. Many customers report significant improvements in their experience after switching to these highly-rated products.`,
    `Users particularly appreciate the quality construction and attention to detail found in top-rated ${displayName}. The combination of performance and durability makes these products excellent long-term investments.`,
    `The versatility of modern ${displayName} is frequently mentioned in customer feedback. Users value the ability to adapt these products to their specific needs and preferences, making them suitable for various applications and users.`,
    `Overall, customer satisfaction with premium ${displayName} remains high, with many users recommending these products to friends and family based on their positive experiences.`
  ];
}

function generateFAQContent(categorySlug: string, categoryName: string) {
  const faqMap: Record<string, Array<{question: string; answer: string}>> = {
    'air-purifiers': [
      {
        question: "How often do I need to change the filter on my Air purifier?",
        answer: "It depends on the type of filter and the manufacturer's recommendations. Some filters need to be changed every 3-6 months, while others can last up to a year. Check the manual or the manufacturer's website for specific instructions."
      },
      {
        question: "Can an Air purifier help with allergies?",
        answer: "Yes, Air purifiers can help with allergies by removing allergens such as dust, pollen, and pet dander from the air. However, it's important to choose an Air purifier with a HEPA filter, which can capture particles as small as 0.3 microns."
      },
      {
        question: "Are Air purifiers noisy?",
        answer: "Some Air purifiers can be noisy, but there are many models available that are designed to be quiet. Look for Air purifiers with low decibel ratings and adjustable fan speeds, so you can customize the noise level to your liking."
      },
      {
        question: "Do Air purifiers remove odors?",
        answer: "Yes, Air purifiers can remove odors by capturing the particles that cause them. Look for Air purifiers with activated carbon filters, which are specifically designed to remove odors from the air."
      },
      {
        question: "Can Air purifiers help with asthma?",
        answer: "Yes, Air purifiers can help with asthma by removing triggers such as dust, pollen, and mold from the air. Again, make sure to choose an Air purifier with a HEPA filter, which can capture these particles. It's also important to keep your Air purifier clean and well-maintained to ensure maximum effectiveness."
      }
    ],
    'steam-cleaners': [
      {
        question: "Can I use a steam cleaner on all floor types?",
        answer: "While steam cleaners work great on hard surfaces like tile, laminate, and sealed hardwood, they should not be used on unsealed wood floors, as the moisture can damage the wood. Always check your floor manufacturer's recommendations before steam cleaning."
      },
      {
        question: "How often should I clean the steam cleaner?",
        answer: "It's recommended to clean your steam cleaner after each use. Empty the water tank, clean the cleaning pads, and allow the machine to dry completely. This prevents mold growth and ensures optimal performance."
      },
      {
        question: "Do steam cleaners really kill germs?",
        answer: "Yes, steam cleaners can kill up to 99.9% of bacteria and germs when used at the proper temperature (typically 212°F/100°C). The high heat effectively sanitizes surfaces without chemicals."
      },
      {
        question: "Can I add cleaning solutions to the water?",
        answer: "Most steam cleaners are designed to work with water only. Adding cleaning solutions can damage the machine and void the warranty. The steam itself is effective at cleaning and sanitizing."
      },
      {
        question: "How long does it take for a steam cleaner to heat up?",
        answer: "Most steam cleaners heat up in 30 seconds to 2 minutes, depending on the model and water temperature. Higher-end models typically heat up faster."
      }
    ],
    'vitamin-d3-k2': [
      {
        question: "What is the recommended dosage for vitamin d3 k2?",
        answer: "The recommended dosage for vitamin d3 k2 can vary depending on age, health status, and other factors. It is best to consult with a healthcare provider to determine the appropriate dosage for your individual needs."
      },
      {
        question: "Can vitamin d3 k2 improve bone health?",
        answer: "Yes, studies have shown that vitamin d3 k2 can improve bone health by increasing calcium absorption and reducing the risk of fractures. It may also help prevent osteoporosis."
      },
      {
        question: "Is it safe to take vitamin d3 k2 supplements?",
        answer: "Yes, when taken in recommended doses, vitamin d3 k2 supplements are generally safe for most people. However, it is important to talk to your doctor before starting any new supplement regimen, especially if you are pregnant, breastfeeding, or have a medical condition."
      },
      {
        question: "Can vitamin d3 k2 improve heart health?",
        answer: "Yes, some research suggests that vitamin d3 k2 may help improve heart health by reducing inflammation, improving blood pressure, and reducing the risk of heart disease. However, more studies are needed to confirm these benefits."
      },
      {
        question: "Are there any side effects of taking vitamin d3 k2 supplements?",
        answer: "In general, vitamin d3 k2 supplements are safe and well-tolerated. However, some people may experience mild side effects such as nausea, constipation, or stomach upset. If you experience any severe or persistent side effects, stop taking the supplement and consult with your doctor."
      }
    ],
    'pets': [
      {
        question: "How do I choose the right pet food for my pet?",
        answer: "Consider your pet's age, size, breed, and any health conditions. Look for high-quality ingredients, proper nutritional balance, and consult with your veterinarian for specific recommendations."
      },
      {
        question: "Are expensive pet toys worth the investment?",
        answer: "Premium pet toys often offer better durability, safety, and engagement for your pets. While they may cost more initially, they typically last longer and provide better value over time."
      },
      {
        question: "How often should I replace pet accessories?",
        answer: "Replace pet accessories when they show signs of wear, damage, or when your pet outgrows them. Regular inspection helps ensure safety and comfort for your pets."
      },
      {
        question: "What should I look for in pet grooming products?",
        answer: "Choose grooming products specifically formulated for your pet's species and coat type. Avoid products with harsh chemicals and always test on a small area first."
      },
      {
        question: "How can I ensure my pet's safety with new products?",
        answer: "Always supervise your pet when introducing new products, read safety instructions carefully, and choose products from reputable brands with good safety records."
      }
    ]
  };

  return faqMap[categorySlug] || generateGenericFAQContent(categoryName);
}

function generateGenericFAQContent(categoryName: string) {
  const displayName = categoryName.replace(/^\d+\s+/, '').toLowerCase();
  
  return [
    {
      question: `How do I choose the right ${displayName}?`,
      answer: `When choosing ${displayName}, consider factors such as your specific needs, budget, available space, and intended use. Reading reviews and comparing features can help you make an informed decision.`
    },
    {
      question: `How long do ${displayName} typically last?`,
      answer: `The lifespan of ${displayName} varies depending on the quality, usage frequency, and maintenance. High-quality products with proper care can last several years, while budget options may need replacement sooner.`
    },
    {
      question: `Are ${displayName} worth the investment?`,
      answer: `Yes, quality ${displayName} can provide excellent value for money when chosen correctly. They offer long-term benefits and can improve your daily life significantly when matched to your specific needs.`
    },
    {
      question: `What maintenance do ${displayName} require?`,
      answer: `Regular maintenance requirements vary by product type, but generally include periodic cleaning, proper storage, and following manufacturer guidelines. Regular maintenance helps ensure optimal performance and longevity.`
    },
    {
      question: `Where can I buy ${displayName}?`,
      answer: `${categoryName} are available from various retailers, both online and in physical stores. Popular options include Amazon, specialty stores, and manufacturer websites. Always buy from reputable sellers to ensure authenticity and warranty coverage.`
    }
  ];
}

// Helper functions to auto-generate content for any category
function generateCategoryTitle(categorySlug: string, categoryName: string, productCount: number): string {
  // Check for existing hardcoded titles first
  const hardcodedTitles: Record<string, string> = {
    'air-purifiers': `${productCount} Best Air Purifiers`,
    'steam-cleaners': `${productCount} Best Steam Cleaners`,
    'vitamin-d3-k2': `${productCount} Best Vitamin D3 K2`,
    'pets': `${productCount} Best Pet Products`,
  };

  if (hardcodedTitles[categorySlug]) {
    return hardcodedTitles[categorySlug];
  }

  // Auto-generate title for new categories
  const displayName = categoryName.replace(/^\d+\s+/, ''); // Remove number prefix
  return `${productCount} Best ${displayName}`;
}

function generateCategoryDescription(categorySlug: string, categoryName: string): string {
  // Check for existing hardcoded descriptions first
  const hardcodedDescriptions: Record<string, string> = {
    'air-purifiers': 'Breathe in the cleanest air with the best air purifiers on the market. Find out which one suits your needs with our comprehensive comparison.',
    'steam-cleaners': 'Discover the most effective steam cleaners for deep cleaning your home. Our comprehensive comparison helps you choose the perfect steam cleaner for your needs.',
    'vitamin-d3-k2': 'Unlock the power of sunshine with Vitamin D3 K2. Discover the ultimate comparison to boost your health and wellbeing. Don\'t miss out!',
    'pets': 'Find the best pet products for your furry friends. Compare top-rated pet food, toys, and accessories with our comprehensive guide.',
  };

  if (hardcodedDescriptions[categorySlug]) {
    return hardcodedDescriptions[categorySlug];
  }

  // Auto-generate description for new categories
  const displayName = categoryName.replace(/^\d+\s+/, '').toLowerCase();
  return `Find the best ${displayName} with our comprehensive comparison and expert reviews. Discover top-rated options that suit your needs and budget.`;
}

function generateBreadcrumbPath(categorySlug: string, categoryName: string): string {
  // Check for existing hardcoded breadcrumbs first
  const hardcodedBreadcrumbs: Record<string, string> = {
    'air-purifiers': 'HOME KITCHEN',
    'steam-cleaners': 'HOME KITCHEN',
    'vitamin-d3-k2': 'HEALTH HOUSEHOLD BABY CARE',
    'pets': 'PETS ANIMALS',
  };

  if (hardcodedBreadcrumbs[categorySlug]) {
    return hardcodedBreadcrumbs[categorySlug];
  }

  // Auto-generate breadcrumb for new categories
  // Try to guess category type based on slug or name
  const categoryType = guessCategoryType(categorySlug, categoryName);
  return categoryType;
}

function guessCategoryType(categorySlug: string, categoryName: string): string {
  const slug = categorySlug.toLowerCase();
  const name = categoryName.toLowerCase();

  // Electronics & Technology
  if (slug.includes('phone') || slug.includes('laptop') || slug.includes('computer') || 
      slug.includes('camera') || slug.includes('gaming') || slug.includes('audio') ||
      name.includes('phone') || name.includes('laptop') || name.includes('computer')) {
    return 'ELECTRONICS TECHNOLOGY';
  }

  // Home & Kitchen
  if (slug.includes('kitchen') || slug.includes('home') || slug.includes('appliance') ||
      slug.includes('cook') || slug.includes('clean') || slug.includes('furniture') ||
      name.includes('kitchen') || name.includes('home') || name.includes('appliance')) {
    return 'HOME KITCHEN';
  }

  // Health & Beauty
  if (slug.includes('health') || slug.includes('beauty') || slug.includes('fitness') ||
      slug.includes('vitamin') || slug.includes('supplement') || slug.includes('skincare') ||
      name.includes('health') || name.includes('beauty') || name.includes('fitness')) {
    return 'HEALTH BEAUTY FITNESS';
  }

  // Sports & Outdoor
  if (slug.includes('sport') || slug.includes('outdoor') || slug.includes('fitness') ||
      slug.includes('exercise') || slug.includes('camping') || slug.includes('hiking') ||
      name.includes('sport') || name.includes('outdoor') || name.includes('fitness')) {
    return 'SPORTS OUTDOOR FITNESS';
  }

  // Pets & Animals
  if (slug.includes('pet') || slug.includes('dog') || slug.includes('cat') ||
      slug.includes('animal') || name.includes('pet') || name.includes('animal')) {
    return 'PETS ANIMALS';
  }

  // Automotive
  if (slug.includes('car') || slug.includes('auto') || slug.includes('vehicle') ||
      slug.includes('motorcycle') || name.includes('car') || name.includes('auto')) {
    return 'AUTOMOTIVE TRANSPORTATION';
  }

  // Office & Business
  if (slug.includes('office') || slug.includes('business') || slug.includes('work') ||
      slug.includes('professional') || name.includes('office') || name.includes('business')) {
    return 'OFFICE BUSINESS';
  }

  // Default fallback
  return 'HOME LIFESTYLE';
}

// Generate data for parent categories that show sub-categories
function generateParentCategoryData(category: any, categorySlug: string): ProductPageData {
  const subCategories = category.children.map((child: any) => ({
    id: child.id,
    name: child.name,
    slug: child.slug,
    productCount: child._count.products,
    icon: child.icon,
    iconImage: child.iconImage
  }));

  const categoryTitle = category.content?.customTitle || `${category.name} Categories`;
  const categoryDescription = category.content?.customDescription || `Explore our comprehensive collection of ${category.name.toLowerCase()} categories. Find the perfect products for your specific needs.`;
  const breadcrumbPath = category.content?.customBreadcrumb || generateBreadcrumbPath(categorySlug, category.name);

  return {
    category: categorySlug,
    categoryTitle,
    categoryDescription,
    updatedDate: category.content?.updatedAt ? 
      new Date(category.content.updatedAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }) : 
      new Date().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      }),
    breadcrumbPath,
    items: [], // No products for parent categories
    subCategories,
    overviewContent: {
      title: category.content?.overviewTitle || `About ${category.name}`,
      paragraphs: (category.content?.overviewParagraphs as string[]) || [
        `Welcome to our comprehensive ${category.name.toLowerCase()} section. We've organized our products into specialized categories to help you find exactly what you're looking for.`,
        `Each category below contains carefully curated products that have been tested and reviewed by our experts. Whether you're a beginner or an experienced user, you'll find options that suit your needs and budget.`,
        `Click on any category to explore our detailed product comparisons, expert reviews, and buying guides.`
      ]
    },
    topProductsContent: {
      title: category.content?.topProductsTitle || `Featured ${category.name} Categories`,
      paragraphs: (category.content?.topProductsParagraphs as string[]) || [
        `Our featured categories represent the most popular and highly-rated ${category.name.toLowerCase()} products. These categories have been selected based on customer satisfaction, expert reviews, and market demand.`,
        `Each category includes detailed product comparisons, pros and cons, and buying recommendations to help you make an informed decision.`
      ]
    },
    faqItems: (category.content?.faqItems as Array<{question: string; answer: string}>) || [
      {
        question: `What types of ${category.name.toLowerCase()} are available?`,
        answer: `We offer a wide range of ${category.name.toLowerCase()} categories, each specializing in different aspects and use cases. Browse through our categories to find the one that best matches your needs.`
      },
      {
        question: `How do I choose the right category?`,
        answer: `Consider your specific needs, budget, and intended use. Each category page provides detailed information about the products and their features to help you make an informed decision.`
      },
      {
        question: `Are all products in each category tested?`,
        answer: `Yes, all products featured in our categories have been thoroughly tested and reviewed by our expert team. We provide honest, unbiased reviews to help you make the best choice.`
      }
    ],
    keywords: category.content?.keywords || `${category.name.toLowerCase()}, ${category.name.toLowerCase()} categories, best ${category.name.toLowerCase()}`,
    metaTitle: category.content?.metaTitle || `${category.name} Categories - Compare & Choose | BuyeReviews`,
    metaDescription: category.content?.metaDescription || `Explore our ${category.name.toLowerCase()} categories and find the perfect products for your needs. Expert reviews and detailed comparisons.`
  };
}
