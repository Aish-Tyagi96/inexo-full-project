const router = require('express').Router();
const rateLimit = require('express-rate-limit');
const authUserController = require('../controllers/auth_users_controller/authUser.controller');
const roleController = require('../controllers/auth_users_controller/role.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  loginSchema,
  createAuthUserSchema,
  createRoleSchema,
} = require('../validations/auth.validation');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again later.',
  },
});

router.post('/login', authLimiter, validate(loginSchema), authUserController.loginAuthUser);
router.get('/me', authenticate, authUserController.getProfile);
router.get('/users', authenticate, authorize('Admin'), authUserController.getAllAuthUser);
router.post('/users', authenticate, authorize('Admin'), validate(createAuthUserSchema), authUserController.registerAuthUser);
router.get('/roles', authenticate, roleController.getRoles);
router.post('/roles', authenticate, authorize('Admin'), validate(createRoleSchema), roleController.createRole);

module.exports = router;
