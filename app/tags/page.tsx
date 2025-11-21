import { getAllArticles } from "@/lib/data";
import Link from "next/link";
import { Tag } from "lucide-react";

export default function TagsPage() {
  const articles = getAllArticles();
  const tags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();

  return (
    <div className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12 border-l-4 border-blue-500 pl-4">
          All Tags
        </h1>
        
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <Link 
              key={tag} 
              href={`/tags/${tag}`}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-lg transition-colors flex items-center gap-2"
            >
              <Tag size={18} /> {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
