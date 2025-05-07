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
  flags: string[];
}

export interface GalleryImage {
  src: string;
  caption?: string;
  alt?: string;
}

export interface GalleryLink {
  text: string;
  url: string;
}

export interface GalleryItem extends WorkItem {
  type: 'gallery';
  images: GalleryImage[];
  link: GalleryLink;
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
  type: 'section' | 'body' | 'image' | 'quote' | 'button' | 'video';
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
  url: string; // makes the image into a link
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

interface VideoContentBlock extends BaseContentBlock {
  type: 'video';
  src: string;
  preview: string;
  text?: string;
}

// Union type combining all content block types
export type ContentBlock = 
  | TextContentBlock 
  | ImageContentBlock 
  | QuoteContentBlock 
  | ButtonContentBlock
  | VideoContentBlock;

export interface Personal {
  name: string;
  descriptors: string[];
  headshot: string;
  contacts: {
    email: string;
    phone: string;
    linkedin: string;
    resume: string;
  };
  "secondary contact": {
    text: string;
    url: string;
  };
  bio: string;
  "as a sections": Array<{
    title: string;
    text: string;
    images?: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
  }>;
  "additional sections": Array<{
    title: string;
    text: string;
    images?: Array<{
      src: string;
      alt: string;
      caption: string;
    }>;
  }>;
} 