const { z } = require('zod');

const galleryItemPayloadSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  image: z.string().trim().min(1, 'Image path is required.'),
  altText: z.string().trim().max(255).optional().default(''),
  sortOrder: z.coerce.number().int().min(0).optional().default(0),
});

const idParamsSchema = (key) => z.object({
  [key]: z.coerce.number().int().positive(),
});

const emptyObjectSchema = z.object({}).default({});

module.exports = {
  createGalleryItemSchema: z.object({ body: galleryItemPayloadSchema, params: emptyObjectSchema, query: emptyObjectSchema }),
  updateGalleryItemSchema: z.object({ body: galleryItemPayloadSchema, params: idParamsSchema('galleryItemId'), query: emptyObjectSchema }),
  deleteGalleryItemSchema: z.object({ body: emptyObjectSchema, params: idParamsSchema('galleryItemId'), query: emptyObjectSchema }),
};
