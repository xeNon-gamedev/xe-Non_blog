import { HeroSection } from "@/components/home/HeroSection";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { 
  getFeaturedArticles, 
  getLatestArticles, 
  getArticlesByCategory 
} from "@/lib/data";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredArticles = getFeaturedArticles();
  const latestArticles = getLatestArticles();
  const devStatusArticles = getArticlesByCategory("DevStatus", 8);
  const techArticles = getArticlesByCategory("Tech", 4);
  const memberStories = getArticlesByCategory("MemberStory", 4);

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <HeroSection articles={featuredArticles} />

      <div className="mx-auto px-4 w-full lg:w-[70%] space-y-24 mt-20">
        
        {/* Latest Articles (2 rows x 4 cols = 8 items) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight border-l-4 border-blue-500 pl-4">
              Latest Articles
            </h2>
            <Link href="/articles" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Dev Status (2 rows x 4 cols = 8 items) */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight border-l-4 border-purple-500 pl-4">
              Development Status
            </h2>
            <Link href="/category/DevStatus" className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {devStatusArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Tech & Member Stories (Side by Side or Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Tech Articles (4 rows x 1 col) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight border-l-4 border-green-500 pl-4">
                Tech Blog
              </h2>
              <Link href="/category/Tech" className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {techArticles.map(article => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </section>

          {/* Member Stories (4 rows x 1 col) */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold tracking-tight border-l-4 border-orange-500 pl-4">
                Member Stories
              </h2>
              <Link href="/category/MemberStory" className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
                View All <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex flex-col gap-6">
              {memberStories.map(article => (
                <ArticleCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
