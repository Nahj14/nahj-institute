import { defineCollection, z } from 'astro:content';

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

export const collections = { articles };