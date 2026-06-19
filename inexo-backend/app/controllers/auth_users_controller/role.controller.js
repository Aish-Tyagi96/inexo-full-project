const db = require('../../models');
const asyncHandler = require('../../utils/asyncHandler');
const { StatusCode } = require('../../constants/HttpStatusCode');

exports.getRoles = asyncHandler(async (_req, res) => {
  const roles = await db.Role.findAll({
    where: { delete_status: 0 },
    order: [['role_id', 'ASC']],
  });

  res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Roles fetched successfully.',
    data: roles,
  });
});

exports.createRole = asyncHandler(async (req, res) => {
  const { roleName } = req.validated.body;

  const existingRole = await db.Role.findOne({
    where: { roleName, delete_status: 0 },
  });

  if (existingRole) {
    return res.status(StatusCode.CONFLICT.code).json({
      success: false,
      message: 'Role already exists.',
    });
  }

  const role = await db.Role.create({ roleName });

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Role created successfully.',
    data: role,
  });
});
