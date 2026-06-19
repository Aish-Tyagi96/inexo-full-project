const router = require('express').Router();
const controller = require('../controllers/gallery_item.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createGalleryItemSchema,
  updateGalleryItemSchema,
  deleteGalleryItemSchema,
} = require('../validations/gallery_item.validation');

router.get('/gallery-items', controller.getAllGalleryItems);

router.post('/gallery-items', authenticate, authorize('Admin'), validate(createGalleryItemSchema), controller.createGalleryItem);
router.put('/gallery-items/:galleryItemId', authenticate, authorize('Admin'), validate(updateGalleryItemSchema), controller.updateGalleryItem);
router.delete('/gallery-items/:galleryItemId', authenticate, authorize('Admin'), validate(deleteGalleryItemSchema), controller.deleteGalleryItem);

module.exports = router;
