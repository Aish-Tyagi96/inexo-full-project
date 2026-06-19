const { z } = require('zod');

const newsEventPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(2).max(255),
  slug: z.string().trim().min(2).max(255).optional(),
  description: z.string().trim().max(10000).optional().default(''),
  fullDescription: z.string().trim().max(50000).optional().default(''),
  image: z.string().trim().optional().nullable(),
  imageAlt: z.string().trim().max(255).optional().default(''),
  eventDate: z.string().trim().optional().nullable(),
  readMoreHref: z.string().trim().optional().default('#'),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const idParamsSchema = (key) => z.object({
  [key]: z.coerce.number().int().positive(),
});

const emptyObjectSchema = z.object({}).default({});

module.exports = {
  createNewsEventSchema: z.object({ body: newsEventPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  updateNewsEventSchema: z.object({ body: newsEventPayloadSchema, params: idParamsSchema('newsEventId'), query: emptyObjectSchema }),
  deleteNewsEventSchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('newsEventId'), query: emptyObjectSchema }),
};
