import { defineCollection, z } from 'astro:content';

// Website essays, commentary and policy briefs
const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    authorBio: z.string().optional(),
    date: z.coerce.date(),
    category: z.enum([
      'Theology & Politics',
      'Geopolitics',
      'Society',
      'Science & Ethics',
      'Religious Harmony',
      'Philosophy',
      'Cultural History',
    ]),
    type: z.enum(['Essay', 'Commentary', 'Policy Brief']),
    excerpt: z.string(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Nahj Journal peer-reviewed articles
const journal = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    authorAffiliation: z.string().optional(),
    authorBio: z.string().optional(),
    volume: z.number(),
    issue: z.number(),
    year: z.number(),
    season: z.enum(['Spring', 'Autumn']),
    category: z.enum([
      'Cultural & Historical Studies',
      'Neuro-Humanities & Cognitive Theory',
      'Critical Modernity & Social Dynamics',
      'Review Essay',
      'Research Article',
    ]),
    abstract: z.string(),
    keywords: z.array(z.string()).optional(),
    doi: z.string().optional(),
    pages: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles, journal };