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
      <h3 className="text-[2.2rem] text-[var(--textColor1)] pb-[20px] leading-[1] font-bold w-fit pl-0 text-center mx-auto">Trending</h3>
      <div className="mt-4 w-full flex flex-row flex-wrap justify-center items-center gap-6">
        {items.map((i) => (
          <div
            key={i.id}
            className="rounded-[12px] bg-white px-6 h-[88px] cursor-pointer text-sm flex items-center gap-[5%] drop-shadow-[0_0_8px_#ccc] w-full sm:w-[calc(50%-12px)] lg:w-[calc((100%-48px)/3)]"
          >
            <Image
              src={i.img}
              alt={i.label}
              width={60}
              height={60}
              className="h-12 w-12 rounded object-cover"
            />
            <span className="flex-1 line-clamp-2 overflow-hidden uppercase text-[var(--text-base)] leading-[var(--text-base--line-height)] font-semibold p-[5px]">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}


