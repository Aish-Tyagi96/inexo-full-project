const { Op } = require('sequelize');
const { StatusCode } = require('../constants/HttpStatusCode');
const catalogSeed = require('../constants/catalog.seed');
const db = require('../models');
const logger = require('../utils/logger');
const slugify = require('../utils/slugify');

function createHttpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizePathToAbsoluteUrl(req, value) {
  if (!value) {
    return null;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedPath = value.startsWith('/') ? value : `/${value}`;
  return `${req.protocol}://${req.get('host')}${normalizedPath}`;
}

function serializeCategory(req, category) {
  return {
    id: category.category_id,
    name: category.name,
    slug: category.slug,
    image: normalizePathToAbsoluteUrl(req, category.imagePath),
    description: category.description,
    cardTitle: category.cardTitle || category.name,
    cardDescription: category.cardDescription || category.description,
    carouselImage: normalizePathToAbsoluteUrl(req, category.carouselImagePath || category.imagePath),
    carouselText: category.carouselText || category.description || category.name,
  };
}

function serializeSubCategory(req, subCategory) {
  return {
    id: subCategory.sub_category_id,
    categoryId: subCategory.category_id,
    name: subCategory.name,
    slug: subCategory.slug,
    image: normalizePathToAbsoluteUrl(req, subCategory.imagePath),
    description: subCategory.description,
    cardTitle: subCategory.cardTitle || subCategory.name,
    cardDescription: subCategory.cardDescription || subCategory.description,
    carouselImage: normalizePathToAbsoluteUrl(req, subCategory.carouselImagePath || subCategory.imagePath),
    carouselText: subCategory.carouselText || subCategory.description || subCategory.name,
  };
}

function serializeProduct(req, product) {
  const media = [...(product.productMedia || [])].sort((left, right) => left.sortOrder - right.sortOrder);
  const imageGallery = media
    .filter((item) => item.mediaType === 'image')
    .map((item) => normalizePathToAbsoluteUrl(req, item.filePath))
    .filter(Boolean);
  const image = normalizePathToAbsoluteUrl(req, product.thumbnailPath) || imageGallery[0] || null;

  const parsePoints = (value) => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value.map((item) => `${item}`.trim()).filter(Boolean);
    }

    if (typeof value === 'string') {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return [];
      }

      if (trimmedValue.startsWith('[')) {
        try {
          const parsedValue = JSON.parse(trimmedValue);

          if (Array.isArray(parsedValue)) {
            return parsedValue.map((item) => `${item}`.trim()).filter(Boolean);
          }
        } catch {
          // Fall back to newline splitting for legacy plain text values.
        }
      }

      return trimmedValue.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
    }

    return [];
  };

  return {
    id: product.product_id,
    categoryId: product.category_id,
    subCategoryId: product.sub_category_id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    cardTitle: product.cardTitle || product.name,
    cardDescription: product.cardDescription || product.shortDescription || product.description,
    image,
    carouselImage: normalizePathToAbsoluteUrl(req, product.carouselImagePath) || image,
    carouselDescription: product.carouselText || product.description || product.name,
    gallery: imageGallery.length ? imageGallery : image ? [image] : [],
    features: [...(product.productFeatures || [])]
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => ({
        title: item.title,
        points: parsePoints(item.description),
      })),
    benefits: [...(product.productBenefits || [])]
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => ({
        title: item.title || '',
        points: parsePoints(item.benefit),
      })),
    relatedProducts: product.relatedProductIds || [],
  };
}

function normalizeBenefitItem(benefit) {
  if (typeof benefit === 'string') {
    return {
      title: '',
      description: benefit.trim(),
    };
  }

  return {
    title: benefit?.title?.trim() || '',
    description: benefit?.description?.trim() || '',
  };
}

function catalogInclude() {
  return [
    { model: db.ProductFeature, as: 'productFeatures' },
    { model: db.ProductBenefit, as: 'productBenefits' },
    { model: db.ProductMedia, as: 'productMedia' },
  ];
}

async function fetchCatalogRecords() {
  const [categories, subCategories, products] = await Promise.all([
    db.ProductCategory.findAll({
      where: { delete_status: 0 },
      order: [['sortOrder', 'ASC'], ['category_id', 'ASC']],
    }),
    db.ProductSubCategory.findAll({
      where: { delete_status: 0 },
      order: [['sortOrder', 'ASC'], ['sub_category_id', 'ASC']],
    }),
    db.Product.findAll({
      where: { delete_status: 0 },
      include: catalogInclude(),
      order: [['sortOrder', 'ASC'], ['product_id', 'ASC']],
    }),
  ]);

  return { categories, products, subCategories };
}

async function buildCatalogTree(req) {
  const { categories, products, subCategories } = await fetchCatalogRecords();

  return {
    categories: categories.map((item) => serializeCategory(req, item)),
    subCategories: subCategories.map((item) => serializeSubCategory(req, item)),
    products: products.map((item) => serializeProduct(req, item)),
  };
}

async function findCategoryBySlug(req, slug) {
  const category = await db.ProductCategory.findOne({
    where: { slug, delete_status: 0 },
  });

  if (!category) {
    return null;
  }

  return serializeCategory(req, category);
}

async function findProductBySlug(req, slug) {
  const product = await db.Product.findOne({
    where: { slug, delete_status: 0 },
    include: catalogInclude(),
  });

  if (!product) {
    return null;
  }

  return serializeProduct(req, product);
}

function normalizeCategoryPayload(payload) {
  const name = payload.name.trim();
  const description = payload.description?.trim() || '';

  return {
    category_id: payload.id,
    name,
    slug: payload.slug?.trim() || slugify(payload.name),
    description,
    cardTitle: payload.cardTitle?.trim() || name,
    cardDescription: payload.cardDescription?.trim() || description,
    imagePath: payload.image?.trim() || null,
    carouselImagePath: payload.carouselImage?.trim() || payload.image?.trim() || null,
    carouselText: payload.carouselText?.trim() || description || name,
    sortOrder: payload.sortOrder ?? 0,
  };
}

function normalizeSubCategoryPayload(payload) {
  const name = payload.name.trim();
  const description = payload.description?.trim() || '';

  return {
    sub_category_id: payload.id,
    category_id: payload.categoryId,
    name,
    slug: payload.slug?.trim() || slugify(payload.name),
    description,
    cardTitle: payload.cardTitle?.trim() || name,
    cardDescription: payload.cardDescription?.trim() || description,
    imagePath: payload.image?.trim() || null,
    carouselImagePath: payload.carouselImage?.trim() || payload.image?.trim() || null,
    carouselText: payload.carouselText?.trim() || description || name,
    sortOrder: payload.sortOrder ?? 0,
  };
}

function normalizeProductPayload(payload) {
  const name = payload.name.trim();
  const description = payload.description?.trim() || '';

  return {
    product_id: payload.id,
    category_id: payload.categoryId ?? null,
    sub_category_id: payload.subCategoryId ?? null,
    name,
    slug: payload.slug?.trim() || slugify(payload.name),
    description,
    cardTitle: payload.cardTitle?.trim() || name,
    cardDescription: payload.cardDescription?.trim() || description,
    thumbnailPath: payload.image?.trim() || null,
    carouselImagePath: payload.carouselImage?.trim() || payload.image?.trim() || null,
    carouselText: payload.carouselDescription?.trim() || description || name,
    sortOrder: payload.sortOrder ?? 0,
  };
}

async function ensureCategoryExists(categoryId, transaction) {
  if (!categoryId) {
    return null;
  }

  const category = await db.ProductCategory.findOne({
    where: { category_id: categoryId, delete_status: 0 },
    transaction,
  });

  if (!category) {
    throw createHttpError(StatusCode.NOT_FOUND.code, 'Category not found.');
  }

  return category;
}

async function ensureSubCategoryExists(subCategoryId, categoryId, transaction) {
  if (!subCategoryId) {
    return null;
  }

  const subCategory = await db.ProductSubCategory.findOne({
    where: {
      sub_category_id: subCategoryId,
      delete_status: 0,
    },
    transaction,
  });

  if (!subCategory) {
    throw createHttpError(StatusCode.NOT_FOUND.code, 'Sub-category not found.');
  }

  if (categoryId && subCategory.category_id !== categoryId) {
    throw createHttpError(StatusCode.BAD_REQUEST.code, 'Sub-category does not belong to the selected category.');
  }

  return subCategory;
}

async function replaceProductChildren(productId, payload, transaction) {
  await Promise.all([
    db.ProductFeature.destroy({ where: { product_id: productId }, transaction }),
    db.ProductBenefit.destroy({ where: { product_id: productId }, transaction }),
    db.ProductMedia.destroy({ where: { product_id: productId }, transaction }),
  ]);

  if (payload.features?.length) {
    await db.ProductFeature.bulkCreate(
      payload.features.map((feature, index) => ({
        product_id: productId,
        title: feature.title.trim(),
        description: feature.description.trim(),
        sortOrder: index,
      })),
      { transaction },
    );
  }

  if (payload.benefits?.length) {
    await db.ProductBenefit.bulkCreate(
      payload.benefits.map((benefit, index) => {
        const normalizedBenefit = normalizeBenefitItem(benefit);

        return {
        product_id: productId,
        benefit: normalizedBenefit.description,
        title: normalizedBenefit.title || null,
        sortOrder: index,
        };
      }),
      { transaction },
    );
  }

  if (payload.gallery?.length) {
    await db.ProductMedia.bulkCreate(
      payload.gallery.map((filePath, index) => ({
        product_id: productId,
        mediaType: 'image',
        filePath: filePath.trim(),
        altText: payload.name,
        sortOrder: index,
      })),
      { transaction },
    );
  }
}

async function upsertCategory(payload, categoryId) {
  return db.sequelize.transaction(async (transaction) => {
    const values = normalizeCategoryPayload(payload);
    let category = null;

    if (categoryId) {
      category = await db.ProductCategory.findOne({
        where: { category_id: categoryId, delete_status: 0 },
        transaction,
      });

      if (!category) {
        throw createHttpError(StatusCode.NOT_FOUND.code, 'Category not found.');
      }

      await category.update(values, { transaction });
    } else {
      category = await db.ProductCategory.create(values, { transaction });
    }

    return category;
  });
}

async function upsertSubCategory(payload, subCategoryId) {
  return db.sequelize.transaction(async (transaction) => {
    await ensureCategoryExists(payload.categoryId, transaction);
    const values = normalizeSubCategoryPayload(payload);
    let subCategory = null;

    if (subCategoryId) {
      subCategory = await db.ProductSubCategory.findOne({
        where: { sub_category_id: subCategoryId, delete_status: 0 },
        transaction,
      });

      if (!subCategory) {
        throw createHttpError(StatusCode.NOT_FOUND.code, 'Sub-category not found.');
      }

      await subCategory.update(values, { transaction });
    } else {
      subCategory = await db.ProductSubCategory.create(values, { transaction });
    }

    return subCategory;
  });
}

async function generateUniqueProductSlug(name, subCategoryId, productId, customSlug, transaction) {
  let baseSlug = customSlug?.trim() || slugify(name);

  if (!customSlug && subCategoryId) {
    const subCategory = await db.ProductSubCategory.findOne({
      where: { sub_category_id: subCategoryId, delete_status: 0 },
      transaction,
    });
    if (subCategory) {
      baseSlug = slugify(`${subCategory.name} ${name}`);
    }
  }

  let slug = baseSlug;
  let counter = 1;
  while (true) {
    const whereClause = {
      slug,
      delete_status: 0,
    };
    if (productId) {
      whereClause.product_id = { [Op.ne]: productId };
    }
    const existing = await db.Product.findOne({
      where: whereClause,
      transaction,
    });
    if (!existing) {
      break;
    }
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
}

async function upsertProduct(payload, productId) {
  return db.sequelize.transaction(async (transaction) => {
    await ensureCategoryExists(payload.categoryId, transaction);
    await ensureSubCategoryExists(payload.subCategoryId, payload.categoryId, transaction);
    
    let product = null;
    let oldSlug = null;
    let oldName = null;
    let oldSubCategoryId = null;

    if (productId) {
      product = await db.Product.findOne({
        where: { product_id: productId, delete_status: 0 },
        transaction,
      });

      if (!product) {
        throw createHttpError(StatusCode.NOT_FOUND.code, 'Product not found.');
      }
      oldSlug = product.slug;
      oldName = product.name;
      oldSubCategoryId = product.sub_category_id;
    }

    const values = normalizeProductPayload(payload);

    if (productId && oldSlug && values.name.toLowerCase() === oldName.toLowerCase() && values.sub_category_id === oldSubCategoryId) {
      values.slug = oldSlug;
    } else {
      values.slug = await generateUniqueProductSlug(
        payload.name,
        payload.subCategoryId,
        productId,
        payload.slug,
        transaction
      );
    }

    if (productId) {
      await product.update(values, { transaction });
    } else {
      product = await db.Product.create(values, { transaction });
    }

    await replaceProductChildren(product.product_id, payload, transaction);

    return db.Product.findOne({
      where: { product_id: product.product_id },
      include: catalogInclude(),
      transaction,
    });
  });
}

async function deleteCategory(categoryId) {
  const [subCategoryCount, productCount] = await Promise.all([
    db.ProductSubCategory.count({ where: { category_id: categoryId, delete_status: 0 } }),
    db.Product.count({ where: { category_id: categoryId, delete_status: 0 } }),
  ]);

  if (subCategoryCount > 0 || productCount > 0) {
    throw createHttpError(StatusCode.CONFLICT.code, 'Delete products and sub-categories before deleting this category.');
  }

  const deletedRows = await db.ProductCategory.destroy({ where: { category_id: categoryId, delete_status: 0 } });

  if (!deletedRows) {
    throw createHttpError(StatusCode.NOT_FOUND.code, 'Category not found.');
  }
}

async function deleteSubCategory(subCategoryId) {
  const productCount = await db.Product.count({ where: { sub_category_id: subCategoryId, delete_status: 0 } });

  if (productCount > 0) {
    throw createHttpError(StatusCode.CONFLICT.code, 'Delete products before deleting this sub-category.');
  }

  const deletedRows = await db.ProductSubCategory.destroy({ where: { sub_category_id: subCategoryId, delete_status: 0 } });

  if (!deletedRows) {
    throw createHttpError(StatusCode.NOT_FOUND.code, 'Sub-category not found.');
  }
}

async function deleteProduct(productId) {
  const deletedRows = await db.Product.destroy({ where: { product_id: productId, delete_status: 0 } });

  if (!deletedRows) {
    throw createHttpError(StatusCode.NOT_FOUND.code, 'Product not found.');
  }
}

async function syncSeedRecord(model, primaryKeyField, id, payload, transaction) {
  const existingRecord = await model.findByPk(id, { transaction });

  if (existingRecord) {
    await existingRecord.update(payload, { transaction });
    return existingRecord;
  }

  return model.create({ [primaryKeyField]: id, ...payload }, { transaction });
}

async function syncSeedProductChildren(product, transaction) {
  await Promise.all([
    db.ProductFeature.destroy({ where: { product_id: product.id }, transaction }),
    db.ProductBenefit.destroy({ where: { product_id: product.id }, transaction }),
    db.ProductMedia.destroy({ where: { product_id: product.id }, transaction }),
  ]);

  if (product.features.length) {
    await db.ProductFeature.bulkCreate(
      product.features.map((feature, index) => ({
        product_id: product.id,
        title: feature.title,
        description: feature.description,
        sortOrder: index,
      })),
      { transaction },
    );
  }

  if (product.benefits.length) {
    await db.ProductBenefit.bulkCreate(
      product.benefits.map((benefit, index) => {
        const normalizedBenefit = normalizeBenefitItem(benefit);

        return {
        product_id: product.id,
        benefit: normalizedBenefit.description,
        title: normalizedBenefit.title || null,
        sortOrder: index,
        };
      }),
      { transaction },
    );
  }

  if (product.gallery.length) {
    await db.ProductMedia.bulkCreate(
      product.gallery.map((filePath, index) => ({
        product_id: product.id,
        mediaType: 'image',
        filePath,
        altText: product.name,
        sortOrder: index,
      })),
      { transaction },
    );
  }
}

async function seedCatalogData() {
  await db.sequelize.transaction(async (transaction) => {
    for (const category of catalogSeed.categories) {
      await syncSeedRecord(
        db.ProductCategory,
        'category_id',
        category.id,
        {
          name: category.name,
          slug: category.slug,
          description: category.description,
          imagePath: category.image,
          sortOrder: category.sortOrder ?? 0,
          delete_status: 0,
          deletedAt: null,
        },
        transaction,
      );
    }

    for (const subCategory of catalogSeed.subCategories) {
      await syncSeedRecord(
        db.ProductSubCategory,
        'sub_category_id',
        subCategory.id,
        {
          category_id: subCategory.categoryId,
          name: subCategory.name,
          slug: subCategory.slug,
          description: subCategory.description,
          imagePath: subCategory.image,
          sortOrder: subCategory.sortOrder ?? 0,
          delete_status: 0,
          deletedAt: null,
        },
        transaction,
      );
    }

    for (const product of catalogSeed.products) {
      await syncSeedRecord(
        db.Product,
        'product_id',
        product.id,
        {
          category_id: product.categoryId,
          sub_category_id: product.subCategoryId,
          name: product.name,
          slug: product.slug,
          shortDescription: product.shortDescription,
          description: product.description,
          cardTitle: product.cardTitle || product.name,
          cardDescription: product.cardDescription || product.shortDescription || product.description,
          thumbnailPath: product.thumbnail,
          carouselImagePath: product.carouselImage || product.thumbnail,
          carouselText: product.carouselText || product.description || product.name,
          specifications: product.specifications,
          relatedProductIds: product.relatedProducts,
          sortOrder: product.sortOrder ?? 0,
          delete_status: 0,
          deletedAt: null,
        },
        transaction,
      );

      await syncSeedProductChildren(product, transaction);
    }
  });

  logger.info({
    categoryCount: catalogSeed.categories.length,
    productCount: catalogSeed.products.length,
    subCategoryCount: catalogSeed.subCategories.length,
  }, 'Ensured Inexo product catalog seed data');
}

module.exports = {
  buildCatalogTree,
  deleteCategory,
  deleteProduct,
  deleteSubCategory,
  findCategoryBySlug,
  findProductBySlug,
  seedCatalogData,
  serializeCategory,
  serializeProduct,
  serializeSubCategory,
  upsertCategory,
  upsertProduct,
  upsertSubCategory,
};