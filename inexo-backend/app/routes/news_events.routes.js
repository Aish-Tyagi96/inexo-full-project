const router = require('express').Router();
const controller = require('../controllers/news_event.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createNewsEventSchema,
  updateNewsEventSchema,
  deleteNewsEventSchema,
} = require('../validations/news_event.validation');

router.get('/news-events', controller.getAllNewsEvents);

router.post('/news-events', authenticate, authorize('Admin'), validate(createNewsEventSchema), controller.createNewsEvent);
router.put('/news-events/:newsEventId', authenticate, authorize('Admin'), validate(updateNewsEventSchema), controller.updateNewsEvent);
router.delete('/news-events/:newsEventId', authenticate, authorize('Admin'), validate(deleteNewsEventSchema), controller.deleteNewsEvent);

module.exports = router;
