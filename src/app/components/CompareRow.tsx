import Image from "next/image";

export type CompareItem = {
  rank: number;
  title: string;
  image: string;
  highlights: string[];
  score: number;
  retailer: string;
  url: string;
  badge?: string; // e.g., "Best Overall"
  discount?: string; // e.g., "20% off"
  reviewsCount?: number;
  boughtNote?: string;
};

function Stars() {
  return (
    <div className="leading-none text-amber-400" aria-label="5 stars">
      ★★★★★
    </div>
  );
}

export default function CompareRow({ item }: { item: CompareItem }) {
  return (
         <div className="relative rounded-xl bg-white p-0  shadow-sm overflow-visible w-full">
      {/* Top row with rank and badge */}
      <div className="flex items-center gap-3 p-4 sm:p-0 sm:gap-4 ml-4">
        <div className="w-6 shrink-0 text-sm font-semibold text-black/70 sm:text-2xl">
          {item.rank}
        </div>
        
        {/* Top-left skewed ribbon badge */}
        {item.badge && (
          <div className="shrink-0">
            <div className="skewed-ribbon">
              <span className="ribbon-text">{item.badge}</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile-only score bubble at top-right with attached discount */}
      <div className="absolute -right-4 -top-3 z-10 block sm:hidden">
        <div className="relative">
          <div className="rounded-xl bg-sky-50 px-4 py-3 text-center shadow w-[140px]">
            <div className="text-3xl font-bold text-black">{item.score.toFixed(1)}</div>
            <Stars />
            {typeof item.reviewsCount === "number" && (
              <div className="mt-2 text-sm text-black/60">
                ({item.reviewsCount.toLocaleString()} reviews)
              </div>
            )}
          </div>
          {item.discount && (
            <div className="absolute right-[10px]  transform scale-[0.95] origin-bottom-right">
              <div className="discount-ribbon">{item.discount}</div>
            </div>
          )}
        </div>
      </div>

      {/* Top-right discount for desktop/tablet */}
      {item.discount && (
        <div className="hidden sm:block absolute right-0 top-0 z-10">
          <div className="discount-ribbon ">
            {item.discount}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-6 w-full px-4 sm:px-0 relative">
        {/* Image */}
        <div className="w-full sm:w-auto flex-shrink-0 flex justify-center sm:justify-start pl-4">
          <div className="w-48 h-48 sm:w-52 sm:h-52 rounded-lg  border-0 overflow-hidden bg-white">
            <Image
              src={item.image}
              alt={item.title}
              width={150}
              height={150}
              className="w-full h-full object-contain p-2"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 w-full sm:w-auto">
                     <h3 className="product-title text-base sm:text-lg md:text-xl font-bold text-left">{item.title}</h3>
          <ul className="  sm:space-y-3 text-xs sm:text-sm md:text-base text-black/80">
            {item.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-3 sm:gap-3">
                <span className="mt-[2px] text-emerald-600 flex-shrink-0">✓</span>
                <span className="min-w-0 text-left">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Score - desktop/tablet only */}
        <div className="hidden sm:block flex-shrink-0 rounded-xl bg-sky-50 px-4 sm:px-6 py-4 sm:py-5 text-center w-full sm:w-auto">
          <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-black">
            {item.score.toFixed(1)}
          </div>
          <Stars />
          {typeof item.reviewsCount === "number" && (
            <div className="mt-3 sm:mt-4 text-sm sm:text-lg text-black/60">
              ({item.reviewsCount.toLocaleString()} reviews)
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 sm:gap-4 flex-shrink-0 min-h-0 w-full sm:w-auto">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-6 sm:px-8 py-3 sm:py-5 text-base sm:text-lg md:text-xl font-medium text-white hover:bg-sky-700 w-full sm:w-auto"
          >
            Check Price
          </a>
          <div className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">
            <Image
              src="/Amazon_logo.svg"
              alt="Amazon"
              width={80}
              height={24}
              className="h-5 sm:h-6 w-auto"
            />
          </div>
          {item.boughtNote && (
            <div className="text-sm sm:text-base md:text-lg text-black/60 text-center leading-tight">{item.boughtNote}</div>
          )}
        </div>
      </div>
    </div>
  );
}
