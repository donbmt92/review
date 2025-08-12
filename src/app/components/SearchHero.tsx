import Image from "next/image";
import SearchInput from "./search/SearchInput";

export default function SearchHero() {
  return (
    <section className="relative isolate">
      <div className="mx-auto max-w-6xl px-4 pt-4 sm:pt-6 pb-6 sm:pb-8 md:pt-8 md:pb-10">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-md">
          <Image
            src="/image.png"
            alt="Background"
            width={1440}
            height={480}
            className="w-full h-[300px] sm:h-[400px] md:h-[480px] object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-[39px] font-bold tracking-tight z-[100] relative pt-8 sm:pt-12 md:pt-[90px] leading-tight">
              Search. Compare. Choose.
            </h1>
            <p className="text-white z-[100] relative pt-4 sm:pt-6 md:pt-[25px] text-sm sm:text-base md:text-[16px] font-normal w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] self-center leading-relaxed">
              We analyze the top products in every category so you can compare
              what truly matters and choose the best for you{" "}
            </p>
            <div className="mt-4 sm:mt-5 w-full max-w-xs sm:max-w-lg md:max-w-2xl px-4 sm:px-0">
              <SearchInput />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
