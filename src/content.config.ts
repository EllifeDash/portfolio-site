import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    author: z.string().default("Abdullah Tayyab"),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    role: z.string(),
    status: z.enum(["live", "released", "in-progress", "archived"]).default("live"),
    stack: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { blog, projects };
