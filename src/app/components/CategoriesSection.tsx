import Image from "next/image";

type Cat = { id: string; label: string; icon: string };

const cats: Cat[] = [
  { id: "appliances", label: "Appliances", icon: "/categories/appliances.png" },
  { id: "automobile", label: "Automobile", icon: "/categories/automobile.png" },
  { id: "beauty", label: "Beauty", icon: "/categories/beauty.png" },
  {
    id: "electronics",
    label: "Electronics",
    icon: "/categories/electronics.png",
  },
  { id: "garden", label: "Garden", icon: "/categories/garden.png" },
  { id: "health", label: "Health", icon: "/categories/health.png" },
  {
    id: "home-kitchen",
    label: "Home & Kitchen",
    icon: "/categories/home-kitchen.png",
  },
  {
    id: "improvements",
    label: "Home Improvements",
    icon: "/categories/improvements.png",
  },
  { id: "office", label: "Office", icon: "/categories/office.png" },
  { id: "pets", label: "Pets", icon: "/categories/pets.png" },
  { id: "sports", label: "Sports", icon: "/categories/sports.png" },
  { id: "toys", label: "Toys & Games", icon: "/categories/toys.png" },
  { id: "other", label: "Other", icon: "/categories/other.png" },
];

export default function CategoriesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="mt-6 rounded-xl bg-[#f2f9ff] pt-6 sm:pt-10 pb-6 sm:pb-[30px] flex flex-col justify-center items-center flex-wrap">
        <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] leading-tight sm:leading-[2.5rem] font-bold text-center p-2 sm:p-[5px] text-[var(--textColor1)]">
          Categories
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 pt-4 sm:pt-[20px] w-full max-w-6xl">
          {cats.map((c) => (
            <div
              key={c.id}
              className="w-[180px] h-[100px] sm:h-[120px] md:h-[140px] p-[10px] sm:p-[10px] bg-[hsla(0,0%,100%,0.8)] border border-[rgba(0,141,255,0.2)] rounded-[15px] sm:rounded-[20px] flex flex-col items-center justify-center gap-2 sm:gap-3 md:gap-5 text-xs sm:text-sm md:text-[0.9rem] font-bold cursor-pointer hover:bg-white/90 transition-all duration-200"
            >
              <Image
                src={c.icon}
                alt={c.label}
                width={40}
                height={40}
                className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 object-contain"
              />
              <span className="text-[#1e70bf] text-xs sm:text-sm md:text-[0.9rem] font-bold text-center leading-tight">
                {c.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
