import { getAllArticles } from "@/lib/data";
import { ArticleCard } from "@/components/ui/ArticleCard";

export async function generateStaticParams() {
  const articles = getAllArticles();
  const tags = Array.from(new Set(articles.flatMap(a => a.tags)));
  return tags.map((tag) => ({
    tag: tag,
  }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const articles = getAllArticles().filter(a => a.tags.includes(decodedTag));

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 border-l-4 border-blue-500 pl-4">
          Tag: #{decodedTag}
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
