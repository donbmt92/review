import Image from "next/image";
import SearchInput from "./search/SearchInput";

export default function SearchHero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-8 sm:pt-8 sm:pb-10">
        <div className="relative overflow-hidden rounded-3xl shadow-md">
          <Image
            src="/image.png"
            alt="Background"
            width={1440}
            height={480}
            className="w-full h-[220px] sm:h-[280px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight">
              Search. Compare. Choose.
            </h1>
            <p className="mt-2 text-white/85 max-w-2xl text-sm sm:text-base">
              We analyze the top products in every category so you can choose the best for you.
            </p>
            <div className="mt-5 w-full max-w-2xl">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


