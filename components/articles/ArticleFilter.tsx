'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tag, Calendar } from 'lucide-react';

interface ArticleFilterProps {
  years: number[];
  tags: string[];
}

export function ArticleFilter({ years, tags }: ArticleFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentYear = searchParams.get('year');
  const currentTag = searchParams.get('tag');

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.set('page', '1'); // Reset to page 1
    router.push(`/articles?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      {/* Year Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-medium min-w-24">
          <Calendar size={18} />
          <span>Year:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParams('year', null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
              !currentYear 
                ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]' 
                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All
          </button>
          {years.map(year => (
            <button
              key={year}
              onClick={() => updateParams('year', currentYear === year.toString() ? null : year.toString())}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                currentYear === year.toString()
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex items-center gap-2 text-gray-400 font-medium min-w-24 pt-2">
          <Tag size={18} />
          <span>Tags:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => updateParams('tag', currentTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                currentTag === tag
                  ? 'bg-purple-600 border-purple-500 text-white shadow-[0_0_10px_rgba(147,51,234,0.3)]'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
