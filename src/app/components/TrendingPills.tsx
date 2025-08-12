import Image from "next/image";

type Item = { id: string; label: string; img: string };

const items: Item[] = [
  { id: "car-fridge", label: "Car Refrigerator", img: "/trending/car-refrigerator.jpg" },
  { id: "wet-dry", label: "Wet Dry Vacuum", img: "/trending/wet-dry-vacuum.jpg" },
  { id: "hair-clippers", label: "Hair Clippers", img: "/trending/hair-clippers.jpg" },
  { id: "business-laptop", label: "Business Laptop", img: "/trending/business-laptop.jpg" },
  { id: "lawn-robot", label: "Mowing Lawn Robot", img: "/trending/lawn-robot.jpg" },
  { id: "appetite", label: "Appetite Suppressant", img: "/trending/appetite-suppressant.jpg" },
];

export default function TrendingPills() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-4">
      <h3 className="text-center font-semibold">Trending</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {items.map((i) => (
          <div
            key={i.id}
            className="rounded-xl border border-black/10 bg-white p-3 text-sm shadow-sm hover:shadow flex items-center gap-2"
          >
            <Image
              src={i.img}
              alt={i.label}
              width={60}
              height={60}
              className="h-10 w-10 rounded object-cover"
            />
            <span className="line-clamp-2 uppercase text-base font-semibold p-[5px]">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


