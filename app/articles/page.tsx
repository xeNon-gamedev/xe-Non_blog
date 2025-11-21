import { getAllArticles } from "@/lib/data";
import { ArticleList } from "@/components/articles/ArticleList";
import { Suspense } from "react";

export default function ArticlesPage() {
  const allArticles = getAllArticles();
  
  // Extract available years and tags
  const years = Array.from(new Set(allArticles.map(a => new Date(a.date).getFullYear()))).sort((a, b) => b - a);
  const tags = Array.from(new Set(allArticles.flatMap(a => a.tags))).sort();

  return (
    <div className="min-h-screen bg-black text-white py-32">
      <div className="mx-auto px-4 w-full lg:w-[70%]">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 border-l-4 border-blue-500 pl-6 tracking-tight">
            All Articles
          </h1>
          <p className="text-xl text-gray-400 pl-7 max-w-2xl leading-relaxed">
            xe-Nonの開発ログから技術記事、メンバーの日常まで。<br />
            私たちの活動のすべてをここにアーカイブしています。
          </p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ArticleList articles={allArticles} years={years} tags={tags} />
        </Suspense>
      </div>
    </div>
  );
}
