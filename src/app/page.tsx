import SearchHero from "./components/SearchHero";
import PopularGrid from "./components/PopularGrid";
import TrendingPills from "./components/TrendingPills";
import CategoriesSection from "./components/CategoriesSection";
import NewsletterCTA from "./components/NewsletterCTA";

export default function Home() {
  return (
    <div className="pb-12">
      <SearchHero />
      <PopularGrid />
      <TrendingPills />
      <CategoriesSection />
      {/* <NewsletterCTA /> */}
    </div>
  );
}
