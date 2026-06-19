const { z } = require('zod');

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

const createAuthUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(150),
    email: z.string().trim().email(),
    phone: z.string().trim().min(8).max(20),
    password: z.string().min(8).max(72),
    roleName: z.string().trim().min(2).max(100),
    profileImage: z.string().trim().url().optional().or(z.literal('')),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

const createRoleSchema = z.object({
  body: z.object({
    roleName: z.string().trim().min(2).max(100),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

module.exports = {
  loginSchema,
  createAuthUserSchema,
  createRoleSchema,
};
