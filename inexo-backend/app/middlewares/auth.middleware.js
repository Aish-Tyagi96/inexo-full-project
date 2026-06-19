const jwt = require('jsonwebtoken');
const env = require('../config/env');
const { StatusCode } = require('../constants/HttpStatusCode');
const db = require('../models');

async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(StatusCode.UNAUTHORIZED.code).json({
        success: false,
        message: 'Authorization bearer token is required.',
      });
    }

    const token = authHeader.split(' ')[1];
    const payload = jwt.verify(token, env.JWT_SECRET);

    const authUser = await db.AuthUser.findOne({
      where: {
        user_id: payload.user_id,
        delete_status: 0,
      },
      include: [{ model: db.Role, as: 'role' }],
    });

    if (!authUser) {
      return res.status(StatusCode.UNAUTHORIZED.code).json({
        success: false,
        message: 'Authenticated user no longer exists.',
      });
    }

    req.user = {
      user_id: authUser.user_id,
      role_id: authUser.role_id,
      userRole: authUser.userRole,
      email: authUser.email,
      name: authUser.name,
    };

    return next();
  } catch (_error) {
    return res.status(StatusCode.UNAUTHORIZED.code).json({
      success: false,
      message: 'Invalid or expired token.',
    });
  }
}

function authorize(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(StatusCode.UNAUTHORIZED.code).json({
        success: false,
        message: 'Unauthorized access.',
      });
    }

    if (!allowedRoles.includes(req.user.userRole)) {
      return res.status(StatusCode.FORBIDDEN.code).json({
        success: false,
        message: 'You do not have access to this resource.',
      });
    }

    return next();
  };
}

module.exports = {
  authenticate,
  authorize,
};
