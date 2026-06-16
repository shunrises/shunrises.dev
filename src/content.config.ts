import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
    schema: z.object({
      draft: z.boolean(),
      date: z.string(),
      title: z.string(),
      description: z.string().optional().default(""),
      category: z.enum(["engineering", "devlog", "essay", "analysis", "note"]),
      tags: z.array(z.string()).optional().default([]),
      author: z.string().optional().default("Subhashis Hansda"),
    }),
  }),
};
