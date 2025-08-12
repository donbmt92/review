import CategoryCard, { Category } from "./CategoryCard";

const popular: Category[] = [
  {
    id: "1",
    title: "Air Purifiers",
    slug: "air-purifiers",
    img: "/air-purifier.webp",
  },
  {
    id: "2",
    title: "Pool Cleaners",
    slug: "pool-cleaners",
    img: "/pool-cleaner.webp",
  },
  {
    id: "3",
    title: "Vibration Plates",
    slug: "vibration-plates",
    img: "/vibration-plate.webp",
  },
];

export default function PopularGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-base font-semibold">Popular</h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {popular.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </section>
  );
}


