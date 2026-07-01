const db = require('../models');
const { StatusCode } = require('../constants/HttpStatusCode');
const asyncHandler = require('../utils/asyncHandler');

function serializeJobOpening(job) {
  return {
    id: job.id,
    title: job.title,
    description: job.description,
    link: job.link || 'https://www.linkedin.com',
    sortOrder: job.sortOrder,
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
}

exports.getAllJobOpenings = asyncHandler(async (req, res) => {
  const jobs = await db.JobOpening.findAll({
    where: { delete_status: 0 },
    order: [
      ['sortOrder', 'ASC'],
      ['id', 'DESC'],
    ],
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Job openings fetched successfully.',
    data: jobs.map((job) => serializeJobOpening(job)),
  });
});

exports.createJobOpening = asyncHandler(async (req, res) => {
  const { title, description, link, sortOrder } = req.validated.body;

  const job = await db.JobOpening.create({
    title,
    description: description || '',
    link: link || 'https://www.linkedin.com',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Job opening created successfully.',
    data: serializeJobOpening(job),
  });
});

exports.updateJobOpening = asyncHandler(async (req, res) => {
  const { jobId } = req.validated.params;
  const { title, description, link, sortOrder } = req.validated.body;

  const job = await db.JobOpening.findOne({
    where: { id: jobId, delete_status: 0 },
  });

  if (!job) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Job opening not found.',
    });
  }

  await job.update({
    title,
    description: description || '',
    link: link || 'https://www.linkedin.com',
    sortOrder: sortOrder || 0,
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Job opening updated successfully.',
    data: serializeJobOpening(job),
  });
});

exports.deleteJobOpening = asyncHandler(async (req, res) => {
  const { jobId } = req.validated.params;

  const job = await db.JobOpening.findOne({
    where: { id: jobId, delete_status: 0 },
  });

  if (!job) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'Job opening not found.',
    });
  }

  // Soft delete
  await job.update({
    delete_status: 1,
    deletedAt: new Date(),
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Job opening deleted successfully.',
  });
});
