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
  client: string;
}

export interface GalleryImage {
  src: string;
  caption: string;
}

export interface GalleryItem extends WorkItem {
  type: 'gallery';
  images: GalleryImage[];
}

export interface CaseStudy extends WorkItem {
  type: 'case-study';
  problem: string;
  solution: string;
  results: string;
  commitment: string;
  heroImage: string;
  contentBlocks: ContentBlock[];
}

// Base interface with common fields
interface BaseContentBlock {
  type: 'section' | 'body' | 'image' | 'quote' | 'button';
}

// Specific interfaces for each type
interface TextContentBlock extends BaseContentBlock {
  type: 'section' | 'body';
  text: string;
}

interface ImageContentBlock extends BaseContentBlock {
  type: 'image';
  text: string; // caption
  src: string;  // required for images
  alt?: string;
}

interface QuoteContentBlock extends BaseContentBlock {
  type: 'quote';
  text: string;
}

interface ButtonContentBlock extends BaseContentBlock {
  type: 'button';
  text: string;
  url: string;  // required for buttons
}

// Union type combining all content block types
export type ContentBlock = 
  | TextContentBlock 
  | ImageContentBlock 
  | QuoteContentBlock 
  | ButtonContentBlock;

export interface Personal {
  name: string;
  descriptors: string[];
  bio: string;
  email: string;
  phone: string;
  location: string;
  "secondary contact": {
    text: string;
    url: string;
  };
  social: {
    linkedin: string;
    github: string;
  };
} 