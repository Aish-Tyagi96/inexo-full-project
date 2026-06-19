const { StatusCode } = require('../../constants/HttpStatusCode');
const {
  buildCatalogTree,
  findCategoryBySlug,
  findProductBySlug,
} = require('../../services/catalog.service');
const asyncHandler = require('../../utils/asyncHandler');

exports.getCatalogTree = asyncHandler(async (req, res) => {
  const data = await buildCatalogTree(req);

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Catalog fetched successfully.',
    data,
  });
});

exports.getCategoryBySlug = asyncHandler(async (req, res) => {
  const category = await findCategoryBySlug(req, req.params.slug);

  if (!category) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Category not found.',
    });
  }

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Category fetched successfully.',
    data: category,
  });
});

exports.getProductBySlug = asyncHandler(async (req, res) => {
  const product = await findProductBySlug(req, req.params.slug);

  if (!product) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Product not found.',
    });
  }

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Product fetched successfully.',
    data: product,
  });
});