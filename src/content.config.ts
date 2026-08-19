import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    titre: z.string(),
    titreSeo: z.string().optional(),
    description: z.string(),
    categorie: z.string(),
    date: z.date(),
    duree: z.string(),
    icone: z.string().default('etincelle'),
  }),
});

export const collections = { articles };
