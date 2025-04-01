export interface Thread {
  id: string;
  name: string;
  featured: string;
  description?: string;
}

export interface WorkItem {
  id: string;
  title: string;
  description: string;
  type: 'gallery' | 'case-study';
  threads: string[];
  thumbnail: string;
  date: string;
}

export interface GalleryItem extends WorkItem {
  type: 'gallery';
  images: string[];
  caption?: string;
}

export interface CaseStudy extends WorkItem {
  type: 'case-study';
  client: string;
  problem: string;
  solution: string;
  results: string;
  commitment: string;
  contentBlocks: ContentBlock[];
}

export interface ContentBlock {
  type: 'text' | 'image' | 'quote' | 'list';
  content: string | string[];
  caption?: string;
}

export interface Personal {
  name: string;
  descriptors: string[];
  bio: string;
  email: string;
  phone: string;
  location: string;
  social: {
    linkedin: string;
    github: string;
  };
} 