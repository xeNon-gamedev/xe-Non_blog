export type Category = 'DevStatus' | 'Tech' | 'MemberStory' | 'General';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  category: Category;
  imageUrl?: string;
  isFeatured?: boolean;
  hideAuthor?: boolean;
  author: {
    name: string;
    avatar?: string;
  };
}
