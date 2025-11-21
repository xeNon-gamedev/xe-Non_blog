import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">xe-Non Blog</h3>
            <p className="text-sm">
              Game Development Team xe-Non Official Blog.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/articles" className="hover:text-white transition-colors">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/tags" className="hover:text-white transition-colors">
                  Tags
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Official Site</h3>
            <a 
              href="https://xe-non.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              xe-Non.com <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <div className="text-center text-sm border-t border-white/10 pt-8">
          &copy; {new Date().getFullYear()} xe-Non. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
