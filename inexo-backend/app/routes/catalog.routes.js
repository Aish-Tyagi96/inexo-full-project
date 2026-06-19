const router = require('express').Router();
const adminController = require('../controllers/catalog_controller/catalog.admin.controller');
const publicController = require('../controllers/catalog_controller/catalog.public.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createCategorySchema,
  createProductSchema,
  createSubCategorySchema,
  deleteCategorySchema,
  deleteProductSchema,
  deleteSubCategorySchema,
  updateCategorySchema,
  updateProductSchema,
  updateSubCategorySchema,
} = require('../validations/catalog.validation');

router.get('/catalog/tree', publicController.getCatalogTree);
router.get('/catalog/categories/:slug', publicController.getCategoryBySlug);
router.get('/catalog/products/:slug', publicController.getProductBySlug);

router.get('/catalog/admin/tree', authenticate, authorize('Admin'), adminController.getAdminCatalogTree);
router.post('/catalog/categories', authenticate, authorize('Admin'), validate(createCategorySchema), adminController.createCategory);
router.put('/catalog/categories/:categoryId', authenticate, authorize('Admin'), validate(updateCategorySchema), adminController.updateCategory);
router.delete('/catalog/categories/:categoryId', authenticate, authorize('Admin'), validate(deleteCategorySchema), adminController.deleteCategory);

router.post('/catalog/sub-categories', authenticate, authorize('Admin'), validate(createSubCategorySchema), adminController.createSubCategory);
router.put('/catalog/sub-categories/:subCategoryId', authenticate, authorize('Admin'), validate(updateSubCategorySchema), adminController.updateSubCategory);
router.delete('/catalog/sub-categories/:subCategoryId', authenticate, authorize('Admin'), validate(deleteSubCategorySchema), adminController.deleteSubCategory);

router.post('/catalog/products', authenticate, authorize('Admin'), validate(createProductSchema), adminController.createProduct);
router.put('/catalog/products/:productId', authenticate, authorize('Admin'), validate(updateProductSchema), adminController.updateProduct);
router.delete('/catalog/products/:productId', authenticate, authorize('Admin'), validate(deleteProductSchema), adminController.deleteProduct);

module.exports = router;