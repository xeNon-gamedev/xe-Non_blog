import React from 'react';

interface QuoteProps {
  children: React.ReactNode;
  author?: string;
  title?: string;
  source?: string;
  sourceUrl?: string;
}

export function Quote({ children, author, title, source, sourceUrl }: QuoteProps) {
  const hasFooter = author || title || source || sourceUrl;

  return (
    <figure className="my-10 overflow-hidden rounded-[5px] border border-white/10 bg-gradient-to-br from-white/5 via-white/10 to-transparent shadow-[0_25px_60px_-35px_rgba(15,23,42,0.8)]">
      <div className="relative px-8 py-10">
        <span className="pointer-events-none absolute -top-10 left-4 text-[10rem] font-serif text-white/5 leading-none select-none">
          “
        </span>
        <blockquote className="relative z-10 text-lg leading-relaxed text-gray-100 [&>p]:my-4 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
          {children}
        </blockquote>
      </div>
      {hasFooter && (
        <figcaption className="flex flex-wrap items-center gap-y-1 gap-x-3 border-t border-white/10 bg-black/20 px-8 py-4 text-sm text-gray-300">
          {author && <span className="font-semibold text-white">{author}</span>}
          {title && <span className="text-gray-400">{title}</span>}
          {(source || sourceUrl) && (
            <span className="text-gray-500">／</span>
          )}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
            >
              {source || 'Source'}
            </a>
          ) : (
            source && <span className="text-gray-400">{source}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
