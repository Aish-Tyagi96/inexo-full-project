const { z } = require('zod');

const jobOpeningPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  title: z.string().trim().min(2).max(255),
  description: z.string().trim().max(10000).optional().default(''),
  link: z.string().trim().url().max(1000).optional().default('https://www.linkedin.com'),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const idParamsSchema = (key) => z.object({
  [key]: z.coerce.number().int().positive(),
});

const emptyObjectSchema = z.object({}).default({});

module.exports = {
  createJobOpeningSchema: z.object({ body: jobOpeningPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  updateJobOpeningSchema: z.object({ body: jobOpeningPayloadSchema, params: idParamsSchema('jobId'), query: emptyObjectSchema }),
  deleteJobOpeningSchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('jobId'), query: emptyObjectSchema }),
};
