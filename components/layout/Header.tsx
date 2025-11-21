'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5 text-white supports-[backdrop-filter]:bg-black/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent group-hover:brightness-125 transition-all">
            xe-Non
          </span>
          <span className="group-hover:text-gray-300 transition-colors">Blog</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/articles" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            Articles
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
          </Link>
          <Link href="/tags" className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group">
            Tags
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
          </Link>
          <a 
            href="https://xe-non.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/5"
          >
            xe-Non.com <ExternalLink size={14} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-16 left-0 right-0 bg-black/95 border-b border-white/10 p-4"
        >
          <nav className="flex flex-col gap-4">
            <Link 
              href="/articles" 
              className="block py-2 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Articles
            </Link>
            <Link 
              href="/tags" 
              className="block py-2 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Tags
            </Link>
            <a 
              href="https://xe-non.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-2 hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              xe-Non.com <ExternalLink size={14} />
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
