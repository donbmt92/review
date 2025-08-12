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
    <div className="relative rounded-xl border border-black/10 bg-white p-4 shadow-sm">
      {/* Top-left badge */}
      {item.badge && (
        <div className="absolute left-10 -top-3 rounded-md bg-amber-400 px-2 py-0.5 text-xs font-semibold text-black shadow">
          {item.badge}
        </div>
      )}

      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="w-6 shrink-0 text-sm font-semibold text-black/70">{item.rank}</div>

        {/* Image */}
        <div className="shrink-0 overflow-hidden rounded-lg border border-black/10 bg-white">
          <Image
            src={item.image}
            alt={item.title}
            width={128}
            height={128}
            className="h-28 w-24 object-contain p-3 sm:h-32 sm:w-28"
          />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-snug">{item.title}</div>
          <ul className="mt-1 space-y-1 text-[12px] text-black/80">
            {item.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-[2px] text-emerald-600">✓</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Score */}
        <div className="shrink-0 rounded-xl bg-sky-50 px-3 py-2 text-center">
          <div className="text-2xl font-bold text-sky-700">{item.score.toFixed(1)}</div>
          <Stars />
          {typeof item.reviewsCount === "number" && (
            <div className="mt-1 text-[11px] text-black/60">({item.reviewsCount.toLocaleString()} reviews)</div>
          )}
        </div>

        {/* CTA */}
        <div className="flex shrink-0 flex-col items-center gap-1">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
          >
            Check Price
          </a>
          <div className="text-base font-extrabold tracking-tight">amazon</div>
          {item.boughtNote && (
            <div className="text-[11px] text-black/60">{item.boughtNote}</div>
          )}
        </div>
      </div>

      {item.discount && (
        <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-0.5 text-[11px] font-semibold text-white">
          {item.discount}
        </div>
      )}
    </div>
  );
}


