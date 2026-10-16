import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Sumber koleksi ada di content/<bahasa>/ (di luar src/), sesuai SPEC.md.
// site.md dikecualikan — itu teks landing, bukan penelitian.
//
// id entri = path relatif tanpa ekstensi ("id/ppdb-lhi", "en/ppdb-lhi").
// generateId wajib: tanpa itu glob memakai field `slug` sebagai id, dan
// kedua bahasa yang ber-slug sama akan saling menimpa.
const penelitian = defineCollection({
  loader: glob({
    pattern: ["*/*.md", "!*/site.md"],
    base: "./content",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    client: z.string(),
    role: z.string(),
    team: z.string(),
    period: z.string(),
    status: z.string(),
    statusShort: z.string().optional(), // versi ringkas untuk kartu
    domain: z.string(),
    stack: z.array(z.string()),
    summary: z.string(),
    problem: z.string(), // modal "lembar lab", bagian 01
    solution: z.string(), // modal "lembar lab", bagian 02
    cover: z.string().optional(), // tanpa cover = og:image dilewati
    featured: z.boolean(),
    order: z.number(),
    confidential: z.boolean(),
    repo: z.string().nullable(), // null = repositori privat
    liveUrl: z.string().url().optional(),
    liveLabel: z.string().optional(),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  }),
});

export const collections = { penelitian };
