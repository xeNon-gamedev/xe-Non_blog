import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Article } from './types';

const articlesDirectory = path.join(process.cwd(), 'content/articles');
const featuredFile = path.join(process.cwd(), 'content/featured.json');

// Helper to get all articles from file system
export function getAllArticles(): Article[] {
  // Create directory if it doesn't exist (for safety)
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  const allArticlesData = fileNames.map((fileName) => {
    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    const data = matterResult.data as any;
    
    // Use id from frontmatter if available, otherwise use filename
    const id = data.id ? String(data.id) : fileName.replace(/\.md$/, '');

    // Handle author field transformation (string -> object)
    const author = typeof data.author === 'string' 
      ? { name: data.author } 
      : data.author;

    return {
      ...data,
      id,
      content: matterResult.content, // Raw markdown content
      author,
    } as Article;
  });

  // Sort articles by date
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Helper to get article content as MDX Source
// export async function getArticleContent(content: string) {
//   const mdxSource = await serialize(content);
//   return mdxSource;
// }

export function getFeaturedArticles() {
  const articles = getAllArticles();
  
  // Try to read from featured.json first
  if (fs.existsSync(featuredFile)) {
    try {
      const featuredIds = JSON.parse(fs.readFileSync(featuredFile, 'utf8'));
      if (Array.isArray(featuredIds)) {
        // Map IDs to articles and filter out any undefined ones (in case file was deleted)
        return featuredIds
          .map(id => articles.find(article => article.id === id))
          .filter((article): article is Article => article !== undefined);
      }
    } catch (e) {
      console.error('Failed to parse featured.json', e);
    }
  }

  // Fallback to isFeatured flag in frontmatter
  return articles.filter(a => a.isFeatured).slice(0, 4);
}

export function getLatestArticles() {
  const articles = getAllArticles();
  return articles.slice(0, 8);
}

export function getArticlesByCategory(category: Article['category'], limit?: number) {
  const articles = getAllArticles();
  const filtered = articles.filter(a => a.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getArticleById(id: string) {
  const articles = getAllArticles();
  return articles.find(a => a.id === id);
}
