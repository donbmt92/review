import Image from "next/image";
import Link from "next/link";

export type Category = {
  id: string;
  title: string;
  slug: string;
  img?: string;
  iconUrl?: string;
};

export default function CategoryCard({
  category,
  hrefBase = "/category",
}: {
  category: Category;
  hrefBase?: string;
}) {
  const href = `/${category.slug}`;
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-2xl border border-black/10 shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/20"
      aria-label={category.title}
    >
      {category.img ? (
        <Image
          src={category.img}
          alt={category.title}
          width={300}
          height={330}
          className=" w-full object-cover"
        />
      ) : (
        <div className="h-40 w-full bg-gray-100" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className=" font-semibold drop-shadow " style={{ fontSize: '2.2rem' }}>{category.title}</div>
      </div>
    </Link>
  );
}


