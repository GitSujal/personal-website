import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** "YYYY" or "YYYY-MM". Kept as strings so a role can be dated as loosely as the facts allow. */
const yearMonth = z.string().regex(/^\d{4}(-\d{2})?$/, 'Use YYYY or YYYY-MM');

const roles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/roles' }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    location: z.string().optional(),
    start: yearMonth,
    /** Omit for an ongoing role. */
    end: yearMonth.optional(),
    kind: z.enum(['work', 'contract', 'venture', 'education', 'volunteer']),
    /** Shown in "Now" and in JSON-LD worksFor. */
    current: z.boolean().default(false),
    /** One or two sentences for the "Now" section. */
    summary: z.string().optional(),
    /** Something Sujal still has to confirm; rendered as a visible TODO marker. */
    todo: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    /** Lineage note: the headline result, then context, stack and a secondary result. */
    result: z.string(),
    context: z.string(),
    stack: z.string(),
    also: z.string().optional(),
  }),
});

const ventures = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ventures' }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
    meta: z.string(),
    tagline: z.string(),
    url: z.url().optional(),
    todo: z.string().optional(),
    facts: z.array(z.object({ label: z.string(), value: z.string() })),
  }),
});

const talks = defineCollection({
  loader: file('src/content/talks.yaml'),
  schema: z.object({
    /** Optional: some talks are confirmed on the r�sum� without a date. */
    date: yearMonth.optional(),
    event: z.string(),
    location: z.string(),
    title: z.string(),
    format: z.enum(['conference', 'meetup', 'workshop', 'panel', 'keynote']),
    /** Unverified talks are listed in dev only, never in production. */
    verified: z.boolean(),
  }),
});

const writing = defineCollection({
  loader: file('src/content/writing.yaml'),
  schema: z.object({
    date: yearMonth,
    title: z.string(),
    url: z.url(),
    minutes: z.number(),
  }),
});

export const collections = { roles, work, ventures, talks, writing };
