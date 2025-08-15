export type ParsedItem = {
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
};

export function decodeImageFromNextProxy(src: string): string {
  try {
    const url = new URL(src);
    const u = url.searchParams.get("url");
    if (u) {
      return decodeURIComponent(u);
    }
    return src;
  } catch {
    // Fallback: handle relative Next.js image proxy path '/_next/image?url=...'
    try {
      if (src.startsWith("/_next/image") && src.includes("url=")) {
        const query = src.split("?")[1] || "";
        const params = new URLSearchParams(query);
        const u = params.get("url");
        if (u) return decodeURIComponent(u);
      }
    } catch {
      // ignore
    }
    return src;
  }
}

function extractFirstMatch(text: string, regex: RegExp): string | undefined {
  const m = text.match(regex);
  return m?.[1];
}

function cleanupLine(line: string): string {
  return line.replace(/^[-•\s]+/, "").trim();
}

export function parseBuyereviewsMarkdown(markdown: string): ParsedItem[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: { rank: number; startIdx: number; endIdx: number }[] = [];

  const rankLineIdxs: { idx: number; rank: number }[] = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (/^\d{1,2}$/.test(t)) {
      const rank = parseInt(t, 10);
      if (!isNaN(rank)) {
        rankLineIdxs.push({ idx: i, rank });
      }
    }
  }

  for (let i = 0; i < rankLineIdxs.length; i++) {
    const startIdx = rankLineIdxs[i].idx;
    const endIdx = i + 1 < rankLineIdxs.length ? rankLineIdxs[i + 1].idx - 1 : lines.length - 1;
    blocks.push({ rank: rankLineIdxs[i].rank, startIdx, endIdx });
  }

  const items: ParsedItem[] = [];

  for (const block of blocks) {
    const slice = lines.slice(block.startIdx, block.endIdx + 1);
    let badge: string | undefined;
    let image = "";
    let url = "";
    let title = "";
    const highlights: string[] = [];
    let score = 0;
    let reviewsCount: number | undefined;
    let boughtNote: string | undefined;
    let discount: string | undefined;
    let retailer = "amazon";

    // Find badge: look for a short, title-cased line near the top that's not a link/image
    for (let i = 1; i < Math.min(6, slice.length); i++) {
      const l = slice[i].trim();
      if (!l) continue;
      if (l.startsWith("[")) continue;
      if (l.startsWith("!")) continue;
      if (/^Best|Hot|Popular|Top|Editor's|Editor’s/i.test(l)) {
        badge = l;
        break;
      }
      // If it's single or two words capitalized, also consider
      if (/^[A-Z][A-Za-z\s]+$/.test(l) && l.length <= 32) {
        badge = l;
        break;
      }
    }

    // Image and primary URL: first occurrence of markdown image wrapped in link
    for (let i = 0; i < slice.length; i++) {
      const l = slice[i];
      const linkImageMatch = l.match(/\[!\[[^\]]*\]\(([^)]+)\)\]\(([^)]+)\)/);
      if (linkImageMatch) {
        image = decodeImageFromNextProxy(linkImageMatch[1]);
        url = linkImageMatch[2];
        break;
      }
    }

    // Title: bold link line [**Title**](url) or [Title](url)
    for (let i = 0; i < slice.length; i++) {
      const l = slice[i];
      const titleBold = extractFirstMatch(l, /\[\*\*([^\]]+)\*\*\]\([^)]*\)/);
      if (titleBold) {
        title = titleBold.trim();
        const href = extractFirstMatch(l, /\[[^\]]+\]\(([^)]+)\)/);
        if (href) url = href;
        break;
      }
      const titlePlain = extractFirstMatch(l, /\[([^\]]+)\]\(([^)]+)\)/);
      if (titlePlain && !l.includes("!")) {
        title = titlePlain.trim();
        const href = extractFirstMatch(l, /\[([^\]]+)\]\(([^)]+)\)/);
        if (href) url = href;
        break;
      }
    }

    // Highlights: up to 3 sentence lines before score line
    let scoreLineIdx = -1;
    for (let i = 0; i < slice.length; i++) {
      if (/^\d+(?:\.\d+)?\s*$/.test(slice[i].trim())) {
        scoreLineIdx = i;
        break;
      }
    }
    if (scoreLineIdx !== -1) {
      // Scan lines between title and score for plain text sentences
      for (let i = 0; i < scoreLineIdx; i++) {
        const raw = slice[i].trim();
        if (!raw) continue;
        if (raw.startsWith("[")) continue;
        if (raw.startsWith("!")) continue;
        if (/^\d{1,2}$/.test(raw)) continue; // rank
        if (badge && raw === badge) continue;
        if (highlights.length < 3 && /[A-Za-z]/.test(raw)) {
          // Heuristic: sentence-like and not headers
          if (!/^#+\s/.test(raw)) {
            highlights.push(cleanupLine(raw));
          }
        }
      }
      const s = parseFloat(slice[scoreLineIdx].trim());
      if (!isNaN(s)) score = s;
    }

    // Reviews line: like (86 reviews)
    for (let i = scoreLineIdx + 1; i < slice.length; i++) {
      const raw = slice[i].trim();
      const m = raw.match(/\((\d[\d,]*)\s+reviews?\)/i);
      if (m) {
        reviewsCount = parseInt(m[1].replace(/,/g, ""), 10);
        break;
      }
      if (/bought in past month/i.test(raw)) {
        boughtNote = raw;
      }
    }

    // Discount: look for **xx% off** or [**xx% off**]
    for (let i = 0; i < slice.length; i++) {
      const raw = slice[i];
      const d = extractFirstMatch(raw, /\*\*([^*]+%\s*off[^*]*)\*\*/i);
      if (d) {
        discount = d.trim();
        break;
      }
    }

    // Retailer detection
    if (!/openamzurl|amazon/i.test(url)) {
      retailer = "unknown";
    }

    if (title && url && image) {
      items.push({
        rank: block.rank,
        title,
        image,
        highlights,
        score,
        retailer,
        url,
        badge,
        discount,
        reviewsCount,
        boughtNote,
      });
    }
  }

  // Sort by rank just in case
  items.sort((a, b) => a.rank - b.rank);
  return items;
}


