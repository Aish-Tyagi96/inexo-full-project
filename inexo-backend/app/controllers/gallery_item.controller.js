const db = require('../models');
const { StatusCode } = require('../constants/HttpStatusCode');
const asyncHandler = require('../utils/asyncHandler');

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

function serializeGalleryItem(req, item) {
  return {
    id: item.id,
    src: normalizePathToAbsoluteUrl(req, item.imagePath),
    alt: item.altText || '',
    sortOrder: item.sortOrder,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

exports.getAllGalleryItems = asyncHandler(async (req, res) => {
  const items = await db.GalleryItem.findAll({
    where: { delete_status: 0 },
    order: [
      ['sortOrder', 'ASC'],
      ['id', 'ASC'],
    ],
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Gallery items fetched successfully.',
    data: items.map((item) => serializeGalleryItem(req, item)),
  });
});

exports.createGalleryItem = asyncHandler(async (req, res) => {
  const { image, altText, sortOrder } = req.validated.body;

  const item = await db.GalleryItem.create({
    imagePath: image,
    altText: altText || '',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Gallery item created successfully.',
    data: serializeGalleryItem(req, item),
  });
});

exports.updateGalleryItem = asyncHandler(async (req, res) => {
  const { galleryItemId } = req.validated.params;
  const { image, altText, sortOrder } = req.validated.body;

  const item = await db.GalleryItem.findOne({
    where: { id: galleryItemId, delete_status: 0 },
  });

  if (!item) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Gallery item not found.',
    });
  }

  await item.update({
    imagePath: image,
    altText: altText || '',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Gallery item updated successfully.',
    data: serializeGalleryItem(req, item),
  });
});

exports.deleteGalleryItem = asyncHandler(async (req, res) => {
  const { galleryItemId } = req.validated.params;

  const item = await db.GalleryItem.findOne({
    where: { id: galleryItemId, delete_status: 0 },
  });

  if (!item) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Gallery item not found.',
    });
  }

  await item.destroy();

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Gallery item deleted successfully.',
  });
});
