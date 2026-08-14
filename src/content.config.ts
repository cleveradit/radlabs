import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Sumber koleksi ada di content/id/ (di luar src/), sesuai SPEC.md.
// site.md dikecualikan — itu teks landing, bukan karya.
const karya = defineCollection({
  loader: glob({
    pattern: ["*.md", "!site.md"],
    base: "./content/id",
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    role: z.string(),
    team: z.string(),
    period: z.string(),
    status: z.string(),
    domain: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    cover: z.string(),
    featured: z.boolean(),
    order: z.number(),
    confidential: z.boolean(),
    repo: z.string().nullable(), // null = repositori privat
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
});

export const collections = { karya };
