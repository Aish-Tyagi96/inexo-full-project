const { z } = require('zod');

const flexibleObjectSchema = z.record(z.string(), z.any()).default({});

const featureSchema = z.object({
  title: z.string().trim().max(191).optional().default(''),
  description: z.string().trim().min(1),
});

const benefitSchema = z.union([
  z.string().trim().min(1),
  z.object({
    title: z.string().trim().max(191).optional().default(''),
    description: z.string().trim().min(1),
  }),
]);

const categoryPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  name: z.string().trim().min(2).max(150),
  slug: z.string().trim().min(2).max(191).optional(),
  description: z.string().trim().max(5000).optional().default(''),
  cardTitle: z.string().trim().max(191).optional().default(''),
  cardDescription: z.string().trim().max(5000).optional().default(''),
  image: z.string().trim().optional().nullable(),
  carouselImage: z.string().trim().optional().nullable(),
  carouselText: z.string().trim().max(5000).optional().default(''),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const subCategoryPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive(),
  name: z.string().trim().min(2).max(150),
  slug: z.string().trim().min(2).max(191).optional(),
  description: z.string().trim().max(5000).optional().default(''),
  cardTitle: z.string().trim().max(191).optional().default(''),
  cardDescription: z.string().trim().max(5000).optional().default(''),
  image: z.string().trim().optional().nullable(),
  carouselImage: z.string().trim().optional().nullable(),
  carouselText: z.string().trim().max(5000).optional().default(''),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const productPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  categoryId: z.coerce.number().int().positive().nullable().optional(),
  subCategoryId: z.coerce.number().int().positive().nullable().optional(),
  name: z.string().trim().min(2).max(200),
  slug: z.string().trim().min(2).max(191).optional(),
  description: z.string().trim().max(20000).optional().default(''),
  cardTitle: z.string().trim().max(191).optional().default(''),
  cardDescription: z.string().trim().max(5000).optional().default(''),
  image: z.string().trim().optional().nullable(),
  carouselImage: z.string().trim().optional().nullable(),
  carouselDescription: z.string().trim().max(5000).optional().default(''),
  gallery: z.array(z.string().trim().min(1)).optional().default([]),
  features: z.array(featureSchema).optional().default([]),
  benefits: z.array(benefitSchema).optional().default([]),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const idParamsSchema = (key) => z.object({
  [key]: z.coerce.number().int().positive(),
});

const emptyObjectSchema = z.object({}).default({});

module.exports = {
  createCategorySchema: z.object({ body: categoryPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  createProductSchema: z.object({ body: productPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  createSubCategorySchema: z.object({ body: subCategoryPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  deleteCategorySchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('categoryId'), query: emptyObjectSchema }),
  deleteProductSchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('productId'), query: emptyObjectSchema }),
  deleteSubCategorySchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('subCategoryId'), query: emptyObjectSchema }),
  updateCategorySchema: z.object({ body: categoryPayloadSchema, params: idParamsSchema('categoryId'), query: emptyObjectSchema }),
  updateProductSchema: z.object({ body: productPayloadSchema, params: idParamsSchema('productId'), query: emptyObjectSchema }),
  updateSubCategorySchema: z.object({ body: subCategoryPayloadSchema, params: idParamsSchema('subCategoryId'), query: emptyObjectSchema }),
};