const router = require('express').Router();

router.use(require('./health.routes'));
router.use(require('./media.routes'));
router.use(require('./catalog.routes'));
router.use(require('./news_events.routes'));
router.use(require('./gallery_item.routes'));
router.use(require('./dashboard.routes'));
router.use('/auth', require('./auth.routes'));
router.use('/contact', require('./contact.routes'));
router.use(require('./job_opening.routes'));

module.exports = router;
