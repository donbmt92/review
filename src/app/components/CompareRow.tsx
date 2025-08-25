import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type CompareItem = {
  rank: number;
  title: string;
  image: string;
  highlights: string[];
  score: number;
  retailer: string;
  url: string;
  badge?: string;
  discount?: string;
  reviewsCount?: number;
  boughtNote?: string;
  category?: string;
  id?: string;
};

interface CompareRowProps {
  item: CompareItem;
  onProductClick: (product: CompareItem, clickType: string) => void;
}

function Stars() {
  return (
    <div className="leading-none text-amber-400" aria-label="5 stars">
      ★★★★★
    </div>
  );
}

function gradeFromScore(score: number): number {
  return score;
}

export default function CompareRow({ item, onProductClick }: CompareRowProps) {
  const safeHighlights = Array.isArray(item.highlights)
    ? item.highlights.filter(Boolean)
    : [];
  console.log("item",item);
  
  // Function để tạo slug từ tên sản phẩm
  const createProductSlug = (item: CompareItem): string => {
    return item.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ ký tự đặc biệt
      .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/-+/g, '-') // Loại bỏ dấu gạch ngang liên tiếp
      .trim(); // Loại bỏ khoảng trắng đầu cuối
  };
  
  // Tạo đường dẫn cho sản phẩm
  const productSlug = createProductSlug(item);
  const productPath = item.category ? `/${item.category}/${productSlug}` : `#`;
  
  return (
    <div className={`compare-row`}>
      <div className="corner-left mb-4">
        <div className="rank-badge">{item.rank}</div>
        {item.badge ? (
          <span className="skewed-ribbon">
            <span className="ribbon-text">{item.badge}</span>
          </span>
        ) : null}
      </div>
      {item.discount ? (
        <span className="discount-ribbon">{item.discount}</span>
      ) : null}
      <div className="image-wrapper">
        <Link
          href={productPath}
          className="cursor-pointer border-none bg-transparent p-0 block"
          aria-label={`View details for ${item.title}`}
          onClick={() => onProductClick(item, 'image')}
        >
          <Image
            src={item.image}
            alt={item.title}
            width={160}
            height={160}
            className="product-image-container"
          />
        </Link>
      </div>

      <div className="info-container">
        <Link
          href={productPath}
          className="product-title cursor-pointer border-none bg-transparent p-0 text-left hover:underline block"
          aria-label={`View details for ${item.title}`}
          onClick={() => onProductClick(item, 'title')}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-left">
            {item.title}
          </h3>
        </Link>

        <div className="info-list">
          {safeHighlights.slice(0, 3).map((text, index) => (
            <div key={`${item.title}-hl-${index}`} className="info-list-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 128"
                width="26px"
                height="26px"
              >
                <path
                  fill="#3c8cfa12"
                  d="M64 25A39 39 0 1 0 64 103A39 39 0 1 0 64 25Z"
                ></path>
                <path
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="10"
                  d="M42 69L55.55 81 86 46"
                ></path>
              </svg>{" "}
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="rating-box">
        <div className="flex flex-col">
          {/* <div className="rating-number">{item.score.toFixed(1)}</div> */}
          <div className="grade-string">
            <span className="grade-number">{item.score}</span>
          </div>
          <div className="stars-rating">
            <Stars />
          </div>
          {typeof item.reviewsCount === "number" ? (
            <div className="reviews-count">
              ({item.reviewsCount.toLocaleString()} reviews)
            </div>
          ) : null}
        </div>
      </div>

      <div className="compare-actions">
        <Link
          href={productPath}
          rel="nofollow sponsored noopener"
          className="action-button"
          onClick={() => onProductClick(item, 'button')}
        >
          Check Out Lastest Price
        </Link>
        <div className="retailer-row">
          <Image
            src="/Amazon_logo.svg"
            alt={item.retailer}
            width={70}
            height={22}
            className="retailer-logo"
          />
        </div>
        {item.boughtNote ? (
          <div className="coupon-label">{item.boughtNote}</div>
        ) : null}
      </div>
    </div>
  );
}
