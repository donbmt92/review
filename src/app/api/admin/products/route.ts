import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";
import { parseBuyereviewsMarkdown, decodeImageFromNextProxy } from "@/app/lib/parseBuyereviews";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        reviewMeta: true,
      },
      orderBy: { createdAt: "desc" },
    });
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể lấy danh sách sản phẩm" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Mode 1: single product { title, imageUrl, score, categoryId }
    // Mode 2: bulk from markdown { markdown, categoryId }
    // Mode 3: bulk from raw HTML snippet { html, categoryId }
    // Mode 4: import from BuyeReviews category URL { url, categoryId? }

    if (typeof body?.markdown === "string") {
      const categoryId: string | undefined = body.categoryId;
      if (!categoryId) {
        return NextResponse.json({ error: "Thiếu categoryId" }, { status: 400 });
      }

      const category = await prisma.category.findUnique({ where: { id: categoryId } });
      if (!category) {
        return NextResponse.json({ error: "Danh mục không tồn tại" }, { status: 400 });
      }

      let markdownInput: string = body.markdown;
      // Allow pasting a full JSON blob that contains { markdown: "..." }
      const trimmed = markdownInput.trim();
      if (trimmed.startsWith("{") && trimmed.includes("\"markdown\"")) {
        try {
          const parsed = JSON.parse(trimmed);
          if (typeof parsed?.markdown === "string") {
            markdownInput = parsed.markdown;
          }
        } catch {
          // ignore JSON parse error, will try to parse as markdown directly
        }
      }

      const items = parseBuyereviewsMarkdown(markdownInput);
      if (!items.length) {
        return NextResponse.json({ error: "Không parse được sản phẩm từ markdown" }, { status: 400 });
      }

      const createdIds: string[] = [];

      for (const it of items) {
        const created = await prisma.product.create({
          data: {
            title: it.title,
            imageUrl: it.image,
            score: it.score || 0,
            categoryId,
            list: [it],
            highlights: {
              create: (it.highlights || []).map((text) => ({ text })),
            },
            offers: {
              create: {
                retailer: it.retailer || "amazon",
                url: it.url,
                badge: it.badge,
                discount: it.discount,
              },
            },
            reviewMeta: it.reviewsCount || it.boughtNote ? {
              create: {
                reviewsCount: it.reviewsCount || 0,
                boughtNote: it.boughtNote,
              },
            } : undefined,
          },
        });
        createdIds.push(created.id);
      }

      return NextResponse.json({ message: `Đã thêm ${createdIds.length} sản phẩm`, ids: createdIds }, { status: 201 });
    }

    if (typeof body?.html === "string") {
      const categoryId: string | undefined = body.categoryId;
      if (!categoryId) {
        return NextResponse.json({ error: "Thiếu categoryId" }, { status: 400 });
      }

      const html: string = body.html;
      // Extract items: image src/srcset via /_next/image?url=..., and title inside .trending-articles-item-title
      // Simple regex-based extraction for provided snippet structure
      const itemRegex = /<div class="trending-articles-item-container">([\s\S]*?)<\/div><\/div>|<div class="trending-articles-item-container">([\s\S]*?)<\/div>/g;
      const titleRegex = /<div class="trending-articles-item-title">[\s\S]*?>([^<]+)<\/div>/i;
      const imgSrcRegex = /<img[^>]+srcset="([^"]+)"[^>]*src="([^"]+)"/i;

      const createdIds: string[] = [];
      let match: RegExpExecArray | null;
      const containers: string[] = [];
      while ((match = itemRegex.exec(html)) !== null) {
        const chunk = match[1] || match[2];
        if (chunk) containers.push(chunk);
      }

      for (const chunk of containers) {
        const titleMatch = chunk.match(titleRegex);
        const title = titleMatch ? titleMatch[1].trim() : undefined;
        const imgMatch = chunk.match(imgSrcRegex);
        let imageUrl: string | undefined;
        if (imgMatch) {
          const raw = imgMatch[2] || imgMatch[1];
          imageUrl = decodeImageFromNextProxy(raw);
        }
        if (!title || !imageUrl) continue;

        const created = await prisma.product.create({
          data: {
            title,
            imageUrl,
            score: 0,
            categoryId,
            list: [{ title, image: imageUrl } as any],
          },
        });
        createdIds.push(created.id);
      }

      return NextResponse.json({ message: `Đã thêm ${createdIds.length} sản phẩm từ HTML`, ids: createdIds }, { status: 201 });
    }

    if (typeof body?.url === "string") {
      const inputUrl: string = body.url;
      let categoryId: string | undefined = body.categoryId;

      if (!categoryId) {
        try {
          const u = new URL(inputUrl);
          const parts = u.pathname.split("/").filter(Boolean);
          const catIdx = parts.findIndex(p => p === "categories");
          if (catIdx !== -1 && parts[catIdx + 1]) {
            const slug = parts[catIdx + 1];
            const found = await prisma.category.findUnique({ where: { slug } });
            if (found) categoryId = found.id;
          }
        } catch {
          // ignore url parse error
        }
      }

      if (!categoryId) {
        return NextResponse.json({ error: "Thiếu categoryId và không suy luận được từ URL" }, { status: 400 });
      }

      const res = await fetch(inputUrl, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) {
        return NextResponse.json({ error: `Không fetch được URL (${res.status})` }, { status: 400 });
      }
      const html = await res.text();

      const itemRegex = /<div[^>]*class=["'][^"']*trending-articles-item-container[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
      const titleRegex = /<div[^>]*class=["'][^"']*trending-articles-item-title[^"']*["'][^>]*>[\s\S]*?>([^<]+)<\/div>/i;
      const imgSrcRegex = /<img[^>]+(?:srcset=["']([^"']+)["'][^>]*|src=["']([^"']+)["'][^>]*|data-src=["']([^"']+)["'][^>]*)/i;

      let match: RegExpExecArray | null;
      const chunks: string[] = [];
      while ((match = itemRegex.exec(html)) !== null) {
        const chunk = match[1] || match[2];
        if (chunk) chunks.push(chunk);
      }

      const createdIds: string[] = [];
      if (chunks.length > 0) {
        for (const chunk of chunks) {
          const titleMatch = chunk.match(titleRegex);
          const title = titleMatch ? titleMatch[1].trim() : undefined;
          const imgMatch = chunk.match(imgSrcRegex);
          let imageUrl: string | undefined;
          if (imgMatch) {
            const raw = imgMatch[2] || imgMatch[1] || imgMatch[3];
            // if srcset, take the first URL token
            const first = (raw || "").split(/\s+/)[0];
            imageUrl = decodeImageFromNextProxy(first);
          }
          if (!title || !imageUrl) continue;

          const exists = await prisma.product.findFirst({ where: { title, categoryId } });
          if (exists) continue;

          const created = await prisma.product.create({
            data: {
              title,
              imageUrl,
              score: 0,
              categoryId,
              list: [{ title, image: imageUrl } as any],
            },
          });
          createdIds.push(created.id);
        }
      } else {
        // Fallback: collect titles and images globally and pair by order
        const titleMatches = Array.from(html.matchAll(/<div[^>]*class=["'][^"']*trending-articles-item-title[^"']*["'][^>]*>[\s\S]*?>([^<]+)<\/div>/gi));
        const imageMatches = Array.from(html.matchAll(/<img[^>]+(?:src=["']([^"']+)["']|data-src=["']([^"']+)["']|srcset=["']([^"']+)["'])/gi));
        const limit = Math.min(titleMatches.length, imageMatches.length);
        for (let i = 0; i < limit; i++) {
          const title = titleMatches[i][1]?.trim();
          const raw = imageMatches[i][1] || imageMatches[i][2] || imageMatches[i][3] || "";
          const first = raw.split(/\s+/)[0];
          const imageUrl = decodeImageFromNextProxy(first);
          if (!title || !imageUrl) continue;

          const exists = await prisma.product.findFirst({ where: { title, categoryId } });
          if (exists) continue;

          const created = await prisma.product.create({
            data: {
              title,
              imageUrl,
              score: 0,
              categoryId,
              list: [{ title, image: imageUrl } as any],
            },
          });
          createdIds.push(created.id);
        }
      }

      return NextResponse.json({ message: `Đã thêm ${createdIds.length} sản phẩm từ URL`, ids: createdIds }, { status: 201 });
    }

    const { title, imageUrl, score, categoryId, list } = body || {};

    if (!title || !imageUrl || score === undefined || !categoryId) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 }
      );
    }

    if (score < 0 || score > 10) {
      return NextResponse.json(
        { error: "Điểm đánh giá phải từ 0-10" },
        { status: 400 }
      );
    }

    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Danh mục không tồn tại" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        title,
        imageUrl,
        score,
        categoryId,
        list: Array.isArray(list) || typeof list === "object" ? list : undefined,
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Lỗi khi thêm sản phẩm:", error);
    return NextResponse.json(
      { error: "Không thể thêm sản phẩm" },
      { status: 500 }
    );
  }
}
