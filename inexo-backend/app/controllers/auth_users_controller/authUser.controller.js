const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const env = require('../../config/env');
const { StatusCode } = require('../../constants/HttpStatusCode');
const db = require('../../models');
const asyncHandler = require('../../utils/asyncHandler');

function serializeUser(user) {
  const plainUser = user.get ? user.get({ plain: true }) : user;
  delete plainUser.password;
  return plainUser;
}

exports.registerAuthUser = asyncHandler(async (req, res) => {
  const currentUser = req.user;

  if (!currentUser || currentUser.userRole !== 'Admin') {
    return res.status(StatusCode.FORBIDDEN.code).json({
      success: false,
      message: 'Only an Admin can create auth users.',
    });
  }

  const { name, email, phone, password, roleName, profileImage } = req.validated.body;

  const existingUser = await db.AuthUser.unscoped().findOne({
    where: {
      delete_status: 0,
      [Op.or]: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    return res.status(StatusCode.CONFLICT.code).json({
      success: false,
      message: 'Email or phone already exists.',
    });
  }

  const role = await db.Role.findOne({ where: { roleName, delete_status: 0 } });

  if (!role) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: `Role \"${roleName}\" not found.`,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await db.AuthUser.create({
    name,
    email,
    phone,
    password: hashedPassword,
    profileImage: profileImage || null,
    role_id: role.role_id,
    userRole: role.roleName,
  });

  return res.status(StatusCode.CREATED.code).json({
    success: true,
    message: 'Auth user created successfully.',
    data: serializeUser(newUser),
  });
});

exports.loginAuthUser = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;

  const user = await db.AuthUser.unscoped().findOne({
    where: { email, delete_status: 0 },
    include: [{ model: db.Role, as: 'role' }],
  });

  if (!user) {
    return res.status(StatusCode.UNAUTHORIZED.code).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(StatusCode.UNAUTHORIZED.code).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const token = jwt.sign(
    {
      user_id: user.user_id,
      userRole: user.userRole,
      userRoleId: user.role_id,
    },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN },
  );

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      user: serializeUser(user),
    },
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await db.AuthUser.findOne({
    where: { user_id: req.user.user_id, delete_status: 0 },
    include: [{ model: db.Role, as: 'role' }],
  });

  if (!user) {
    return res.status(StatusCode.NOT_FOUND.code).json({
      success: false,
      message: 'User not found.',
    });
  }

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Profile fetched successfully.',
    data: serializeUser(user),
  });
});

exports.getAllAuthUser = asyncHandler(async (_req, res) => {
  const users = await db.AuthUser.findAll({
    where: { delete_status: 0 },
    include: [{ model: db.Role, as: 'role' }],
    order: [['user_id', 'DESC']],
  });

  return res.status(StatusCode.OK.code).json({
    success: true,
    message: 'Auth users fetched successfully.',
    data: users.map(serializeUser),
  });
});
