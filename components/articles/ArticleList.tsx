"use client";

import { useSearchParams } from "next/navigation";
import { Article } from "@/lib/types";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { ArticleFilter } from "@/components/articles/ArticleFilter";
import { Pagination } from "@/components/articles/Pagination";

const ITEMS_PER_PAGE = 9;

interface ArticleListProps {
  articles: Article[];
  years: number[];
  tags: string[];
}

export function ArticleList({ articles, years, tags }: ArticleListProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const year = searchParams.get("year") ? Number(searchParams.get("year")) : null;
  const tag = searchParams.get("tag");

  // Filter by year and tag
  let filteredArticles = articles;
  
  if (year) {
    filteredArticles = filteredArticles.filter(a => new Date(a.date).getFullYear() === year);
  }

  if (tag) {
    filteredArticles = filteredArticles.filter(a => a.tags.includes(tag));
  }

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <>
        <div className="mb-16">
          <ArticleFilter years={years} tags={tags} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {paginatedArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {paginatedArticles.length === 0 && (
          <div className="text-center py-32 text-gray-500">
            <p className="text-xl">No articles found for the selected criteria.</p>
          </div>
        )}

        <div className="mt-24 border-t border-white/10 pt-12">
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
    </>
  );
}
