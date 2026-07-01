const router = require('express').Router();
const controller = require('../controllers/job_opening.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validate.middleware');
const {
  createJobOpeningSchema,
  updateJobOpeningSchema,
  deleteJobOpeningSchema,
} = require('../validations/job_opening.validation');

router.get('/jobs', controller.getAllJobOpenings);

router.post('/jobs', authenticate, authorize('Admin'), validate(createJobOpeningSchema), controller.createJobOpening);
router.put('/jobs/:jobId', authenticate, authorize('Admin'), validate(updateJobOpeningSchema), controller.updateJobOpening);
router.delete('/jobs/:jobId', authenticate, authorize('Admin'), validate(deleteJobOpeningSchema), controller.deleteJobOpening);

module.exports = router;
