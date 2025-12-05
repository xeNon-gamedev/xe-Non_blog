import { getArticleById, getAllArticles } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag, User } from "lucide-react";
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ChatBubble } from "@/components/mdx/ChatBubble";
import { Question } from "@/components/mdx/Question";
import { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

const components = {
  ChatBubble,
  Question,
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const ogImage = article.imageUrl || '/images/og-default.jpg';

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: `${SITE_URL}/articles/${article.id}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.date,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    image: article.imageUrl ? [article.imageUrl] : [],
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
    },
    description: article.excerpt,
  };

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero Image */}
      {article.imageUrl && (
        <div className="w-full h-[40vh] md:h-[60vh] relative mb-12">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${article.imageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-12 container mx-auto">
            <div className="max-w-4xl">
              <span className="inline-block px-3 py-1 mb-4 text-sm font-bold text-white bg-blue-600 rounded-full">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                {!article.hideAuthor && (
                  <div className="flex items-center gap-2">
                    <User size={18} />
                    <span>{article.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {!article.imageUrl && (
          <div className="max-w-4xl mx-auto mb-12 pt-12">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-bold text-white bg-blue-600 rounded-full">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-400 border-b border-white/10 pb-8">
              {!article.hideAuthor && (
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{article.author.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <MDXRemote 
              source={article.content} 
              components={components} 
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkBreaks],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </div>

          <div className="border-t border-white/10 pt-8 mt-12">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Tag size={20} /> Tags
            </h3>
            <div className="flex flex-wrap gap-2 mb-12">
              {article.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/articles?tag=${tag}`}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-sm text-gray-300 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>

            <Link 
              href="/articles"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft size={20} /> Back to Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
