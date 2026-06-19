const { StatusCode } = require('../../constants/HttpStatusCode');
const {
  buildCatalogTree,
  deleteCategory,
  deleteProduct,
  deleteSubCategory,
  serializeCategory,
  serializeProduct,
  serializeSubCategory,
  upsertCategory,
  upsertProduct,
  upsertSubCategory,
} = require('../../services/catalog.service');
const asyncHandler = require('../../utils/asyncHandler');

exports.getAdminCatalogTree = asyncHandler(async (req, res) => {
  const data = await buildCatalogTree(req);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Admin catalog fetched successfully.',
    data,
  });
});

exports.createCategory = asyncHandler(async (req, res) => {
  const category = await upsertCategory(req.validated.body);

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Category created successfully.',
    data: serializeCategory(req, category),
  });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const category = await upsertCategory(req.validated.body, req.validated.params.categoryId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Category updated successfully.',
    data: serializeCategory(req, category),
  });
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  await deleteCategory(req.validated.params.categoryId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Category deleted successfully.',
  });
});

exports.createSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await upsertSubCategory(req.validated.body);

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Sub-category created successfully.',
    data: serializeSubCategory(req, subCategory),
  });
});

exports.updateSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await upsertSubCategory(req.validated.body, req.validated.params.subCategoryId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Sub-category updated successfully.',
    data: serializeSubCategory(req, subCategory),
  });
});

exports.deleteSubCategory = asyncHandler(async (req, res) => {
  await deleteSubCategory(req.validated.params.subCategoryId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Sub-category deleted successfully.',
  });
});

exports.createProduct = asyncHandler(async (req, res) => {
  const product = await upsertProduct(req.validated.body);

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Product created successfully.',
    data: serializeProduct(req, product),
  });
});

exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await upsertProduct(req.validated.body, req.validated.params.productId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Product updated successfully.',
    data: serializeProduct(req, product),
  });
});

exports.deleteProduct = asyncHandler(async (req, res) => {
  await deleteProduct(req.validated.params.productId);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Product deleted successfully.',
  });
});