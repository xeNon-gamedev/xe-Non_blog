import Link from 'next/link';
import { Article } from '@/lib/types';
import { Calendar, Tag } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  variant?: 'vertical' | 'horizontal';
}

export function ArticleCard({ article, variant = 'vertical' }: ArticleCardProps) {
  if (variant === 'horizontal') {
    return (
      <Link href={`/articles/${article.id}`} className="group relative block h-full">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-500" />
        <div className="relative flex flex-col md:flex-row h-full bg-black rounded-xl overflow-hidden border border-white/10 group-hover:border-transparent transition-colors">
          <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
            {article.imageUrl && (
              <div 
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                style={{ backgroundImage: `url(${article.imageUrl})` }}
              />
            )}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
          </div>
          <div className="p-6 flex flex-col justify-center md:w-2/3">
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
              <span className="text-blue-400 font-medium">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {article.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-1 bg-white/5 rounded-full text-gray-300 flex items-center gap-1">
                  <Tag size={10} /> {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/articles/${article.id}`} className="group relative block h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-50 blur transition duration-500" />
      <div className="relative flex flex-col h-full bg-black rounded-xl overflow-hidden border border-white/10 group-hover:border-transparent transition-colors">
        <div className="h-48 relative overflow-hidden">
          {article.imageUrl ? (
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              style={{ backgroundImage: `url(${article.imageUrl})` }}
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 text-xs font-bold bg-black/60 backdrop-blur-sm text-white rounded border border-white/10">
              {article.category}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-gray-500">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
