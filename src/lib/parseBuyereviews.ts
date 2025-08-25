export interface ParsedProduct {
  title: string;
  imageUrl: string;
  score: number;
  rank: number;
  reviewsCount?: number;
  highlights: string[];
  discount?: string;
  asin: string;
  description?: string;
  price?: string;
}

export function parseBuyeReviewsHTML(html: string): ParsedProduct[] {
  const products: ParsedProduct[] = [];
  
  try {
    // Tạo DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Parser chuyên dụng cho BuyeReviews
    const buyeReviewsProducts = parseBuyeReviewsStructure(doc);
    products.push(...buyeReviewsProducts);
    
    // Nếu không tìm thấy sản phẩm, thử parse theo cách thông thường
    if (products.length === 0) {
      const genericProducts = parseGenericStructure(doc);
      products.push(...genericProducts);
    }
    
  } catch (error) {
    console.error('Error parsing HTML:', error);
  }
  
  return products;
}

function parseBuyeReviewsStructure(doc: Document): ParsedProduct[] {
  const products: ParsedProduct[] = [];
  
  try {
    // Tìm các link sản phẩm có chứa ASIN
    const productLinks = doc.querySelectorAll('a[href*="asin="]');
    
    productLinks.forEach((link, index) => {
      try {
        const href = link.getAttribute('href') || '';
        const asinMatch = href.match(/asin=([A-Z0-9]{10})/);
        const asin = asinMatch ? asinMatch[1] : '';
        
        if (!asin) return;
        
        // Tìm parent element chứa thông tin sản phẩm
        const productContainer = link.closest('div, article, section') || link.parentElement;
        if (!productContainer) return;
        
        // Trích xuất tiêu đề
        const titleElement = productContainer.querySelector('h1, h2, h3, h4, h5, h6, strong, b') || link;
        const title = titleElement.textContent?.trim() || `Product ${index + 1}`;
        
        // Trích xuất hình ảnh
        const imgElement = productContainer.querySelector('img') || link.querySelector('img');
        const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src') || '';
        
        // Trích xuất điểm số
        const scoreText = productContainer.textContent?.match(/(\d+\.?\d*)/);
        const score = scoreText ? parseFloat(scoreText[1]) : 0;
        
        // Trích xuất thứ hạng
        const rankText = productContainer.textContent?.match(/rank\s*(\d+)/i) || productContainer.textContent?.match(/(\d+)\s*rank/i);
        const rank = rankText ? parseInt(rankText[1]) : index + 1;
        
        // Trích xuất số lượng review
        const reviewsText = productContainer.textContent?.match(/(\d+(?:,\d+)*)\s*reviews?/i);
        const reviewsCount = reviewsText ? parseInt(reviewsText[1].replace(/,/g, '')) : undefined;
        
        // Trích xuất highlights
        const highlights: string[] = [];
        const textContent = productContainer.textContent || '';
        const sentences = textContent.split(/[.!?]/).filter(s => s.trim().length > 20 && s.trim().length < 150);
        highlights.push(...sentences.slice(0, 3));
        
        // Trích xuất discount
        const discountText = productContainer.textContent?.match(/(\d+%)\s*off/i) || productContainer.textContent?.match(/off\s*(\d+%)/i);
        const discount = discountText ? discountText[1] : undefined;
        
        // Trích xuất mô tả
        const descriptionElement = productContainer.querySelector('p, [class*="description"], [class*="summary"]');
        const description = descriptionElement?.textContent?.trim();
        
        // Trích xuất giá
        const priceText = productContainer.textContent?.match(/\$\d+(?:\.\d{2})?/);
        const price = priceText ? priceText[0] : undefined;
        
        if (title && imageUrl) {
          products.push({
            title,
            imageUrl,
            score,
            rank,
            reviewsCount,
            highlights,
            discount,
            asin,
            description,
            price
          });
        }
      } catch (error) {
        console.error('Error parsing BuyeReviews product:', error);
      }
    });
    
  } catch (error) {
    console.error('Error parsing BuyeReviews structure:', error);
  }
  
  return products;
}

function parseGenericStructure(doc: Document): ParsedProduct[] {
  const products: ParsedProduct[] = [];
  
  try {
    // Tìm tất cả các sản phẩm theo class name
    const productElements = doc.querySelectorAll('[class*="product"], [class*="item"], [class*="card"]');
    
    productElements.forEach((element, index) => {
      try {
        // Trích xuất tiêu đề
        const titleElement = element.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="name"]');
        const title = titleElement?.textContent?.trim() || `Product ${index + 1}`;
        
        // Trích xuất hình ảnh
        const imgElement = element.querySelector('img');
        const imageUrl = imgElement?.getAttribute('src') || imgElement?.getAttribute('data-src') || '';
        
        // Trích xuất điểm số
        const scoreText = element.textContent?.match(/(\d+\.?\d*)/);
        const score = scoreText ? parseFloat(scoreText[1]) : 0;
        
        // Trích xuất thứ hạng
        const rankText = element.textContent?.match(/rank\s*(\d+)/i) || element.textContent?.match(/(\d+)\s*rank/i);
        const rank = rankText ? parseInt(rankText[1]) : index + 1;
        
        // Trích xuất số lượng review
        const reviewsText = element.textContent?.match(/(\d+(?:,\d+)*)\s*reviews?/i);
        const reviewsCount = reviewsText ? parseInt(reviewsText[1].replace(/,/g, '')) : undefined;
        
        // Trích xuất highlights
        const highlights: string[] = [];
        const highlightElements = element.querySelectorAll('li, p, [class*="feature"], [class*="highlight"]');
        highlightElements.forEach(el => {
          const text = el.textContent?.trim();
          if (text && text.length > 10 && text.length < 200) {
            highlights.push(text);
          }
        });
        
        // Trích xuất discount
        const discountText = element.textContent?.match(/(\d+%)\s*off/i) || element.textContent?.match(/off\s*(\d+%)/i);
        const discount = discountText ? discountText[1] : undefined;
        
        // Trích xuất ASIN từ URL
        const asinMatch = element.innerHTML?.match(/asin=([A-Z0-9]{10})/);
        const asin = asinMatch ? asinMatch[1] : `PROD${index + 1}`;
        
        if (title && imageUrl) {
          products.push({
            title,
            imageUrl,
            score,
            rank,
            reviewsCount,
            highlights: highlights.slice(0, 3), // Giới hạn 3 highlights
            discount,
            asin
          });
        }
      } catch (error) {
        console.error('Error parsing product element:', error);
      }
    });
    
  } catch (error) {
    console.error('Error parsing generic structure:', error);
  }
  
  return products;
}

// Hàm helper để làm sạch text
export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n/g, ' ')
    .trim();
}

// Hàm helper để trích xuất số từ text
export function extractNumber(text: string): number | undefined {
  const match = text.match(/(\d+(?:,\d+)*)/);
  return match ? parseInt(match[1].replace(/,/g, '')) : undefined;
}

// Hàm helper để trích xuất phần trăm từ text
export function extractPercentage(text: string): string | undefined {
  const match = text.match(/(\d+%)/);
  return match ? match[1] : undefined;
}
