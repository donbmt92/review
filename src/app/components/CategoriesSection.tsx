import Image from "next/image";

type Cat = { id: string; label: string; icon: string };

const cats: Cat[] = [
  { id: "appliances", label: "Appliances", icon: "/categories/appliances.png" },
  { id: "automobile", label: "Automobile", icon: "/categories/automobile.png" },
  { id: "beauty", label: "Beauty", icon: "/categories/beauty.png" },
  { id: "electronics", label: "Electronics", icon: "/categories/electronics.png" },
  { id: "garden", label: "Garden", icon: "/categories/garden.png" },
  { id: "health", label: "Health", icon: "/categories/health.png" },
  { id: "home-kitchen", label: "Home & Kitchen", icon: "/categories/home-kitchen.png" },
  { id: "improvements", label: "Home Improvements", icon: "/categories/improvements.png" },
  { id: "office", label: "Office", icon: "/categories/office.png" },
  { id: "pets", label: "Pets", icon: "/categories/pets.png" },
  { id: "sports", label: "Sports", icon: "/categories/sports.png" },
  { id: "toys", label: "Toys & Games", icon: "/categories/toys.png" },
  { id: "other", label: "Other", icon: "/categories/other.png" },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h2 className="text-center text-lg font-semibold">Categories</h2>
      <div className="mt-6 rounded-2xl border border-black/10 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-wrap justify-center gap-3">
          {cats.map((c) => (
            <div
              key={c.id}
              className="w-1/2 sm:w-1/3 md:w-[calc((100%_-_0.75rem_*_4)/5)] rounded-xl border border-sky-200 bg-sky-50 p-4 text-center text-sm hover:bg-sky-100 flex flex-col items-center gap-2"
            >
              <Image src={c.icon} alt={c.label} width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-bold">{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


