const db = require('../models');
const { StatusCode } = require('../constants/HttpStatusCode');
const asyncHandler = require('../utils/asyncHandler');
const slugify = require('../utils/slugify');

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

function serializeNewsEvent(req, event) {
  return {
    id: event.id,
    title: event.title,
    slug: event.slug,
    description: event.description,
    fullDescription: event.fullDescription,
    image: normalizePathToAbsoluteUrl(req, event.imagePath),
    imageAlt: event.imageAlt || event.title,
    date: event.eventDate,
    readMoreHref: event.readMoreHref || '#',
    sortOrder: event.sortOrder,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
  };
}

exports.getAllNewsEvents = asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
  
  const events = await db.NewsEvent.findAll({
    where: { delete_status: 0 },
    order: [
      ['eventDate', 'DESC'],
      ['sortOrder', 'ASC'],
      ['id', 'DESC'],
    ],
    limit: isNaN(limit) ? undefined : limit,
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'News and events fetched successfully.',
    data: events.map((event) => serializeNewsEvent(req, event)),
  });
});

exports.createNewsEvent = asyncHandler(async (req, res) => {
  const { title, description, fullDescription, image, imageAlt, eventDate, readMoreHref, sortOrder } = req.validated.body;
  
  const slug = req.validated.body.slug || slugify(title);
  
  // Ensure unique slug
  let uniqueSlug = slug;
  let count = 1;
  while (await db.NewsEvent.findOne({ where: { slug: uniqueSlug, delete_status: 0 } })) {
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  const event = await db.NewsEvent.create({
    title,
    slug: uniqueSlug,
    description: description || '',
    fullDescription: fullDescription || '',
    imagePath: image || null,
    imageAlt: imageAlt || title,
    eventDate: eventDate || new Date().toISOString().split('T')[0],
    readMoreHref: readMoreHref || '#',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'News event created successfully.',
    data: serializeNewsEvent(req, event),
  });
});

exports.updateNewsEvent = asyncHandler(async (req, res) => {
  const { newsEventId } = req.validated.params;
  const { title, description, fullDescription, image, imageAlt, eventDate, readMoreHref, sortOrder } = req.validated.body;

  const event = await db.NewsEvent.findOne({
    where: { id: newsEventId, delete_status: 0 },
  });

  if (!event) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'News event not found.',
    });
  }

  const slug = req.validated.body.slug || slugify(title);
  let uniqueSlug = slug;
  let count = 1;
  while (true) {
    const existing = await db.NewsEvent.findOne({ where: { slug: uniqueSlug, delete_status: 0 } });
    if (!existing || existing.id === event.id) {
      break;
    }
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  await event.update({
    title,
    slug: uniqueSlug,
    description: description || '',
    fullDescription: fullDescription || '',
    imagePath: image || null,
    imageAlt: imageAlt || title,
    eventDate: eventDate || new Date().toISOString().split('T')[0],
    readMoreHref: readMoreHref || '#',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'News event updated successfully.',
    data: serializeNewsEvent(req, event),
  });
});

exports.deleteNewsEvent = asyncHandler(async (req, res) => {
  const { newsEventId } = req.validated.params;

  const event = await db.NewsEvent.findOne({
    where: { id: newsEventId, delete_status: 0 },
  });

  if (!event) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'News event not found.',
    });
  }

  await event.destroy();

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'News event deleted successfully.',
  });
});
