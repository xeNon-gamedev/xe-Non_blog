import { getArticlesByCategory, getAllArticles } from "@/lib/data";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Category } from "@/lib/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = getAllArticles();
  const categories = Array.from(new Set(articles.map(a => a.category)));
  return categories.map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  const articles = getArticlesByCategory(category as Category);

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 border-l-4 border-blue-500 pl-4">
          Category: {category}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
