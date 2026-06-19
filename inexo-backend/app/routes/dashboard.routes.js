const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.get('/dashboard/stats', authenticate, authorize('Admin'), dashboardController.getDashboardStats);

module.exports = router;
