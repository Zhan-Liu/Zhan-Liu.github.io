import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    image: z.string().optional(),
    badge: z.string().optional(),
    draft: z.boolean().default(false),
    categories: z
     .array(z.string())
     .refine((items) => new Set(items).size === items.length, {
        message: "categories must be unique",
      })
     .optional(),
    tags: z
     .array(z.string())
     .refine((items) => new Set(items).size === items.length, {
        message: "tags must be unique",
      })
     .optional(),
  }),
});

// 定义 memory 内容集合
const memory = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(), 
    location: z.string().optional(),
    description: z.string().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    badge: z.string().optional(),
    draft: z.boolean().default(false),
    categories: z
     .array(z.string())
     .refine((items) => new Set(items).size === items.length, {
        message: "categories must be unique",
      })
     .optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, memory }; // 将 memory 添加到导出的集合中 [1]