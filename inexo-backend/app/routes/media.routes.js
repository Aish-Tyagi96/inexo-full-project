const router = require('express').Router();
const audioController = require('../controllers/upload_files_controller/upload_audio.controller');
const imageController = require('../controllers/upload_files_controller/upload_image.controller');
const multipleFilesController = require('../controllers/upload_files_controller/upload_multifile.controller');
const pdfController = require('../controllers/upload_files_controller/upload_pdf.controller');
const videoController = require('../controllers/upload_files_controller/upload_video.controller');
const { authenticate, authorize } = require('../middlewares/auth.middleware');

router.post('/uploadImage', authenticate, authorize('Admin'), imageController.uploadImage);
router.post('/uploadPdf', authenticate, authorize('Admin'), pdfController.uploadPdf);
router.post('/uploadVideo', authenticate, authorize('Admin'), videoController.uploadVideo);
router.post('/uploadAudio', authenticate, authorize('Admin'), audioController.uploadAudio);
router.post('/multiplefiles', authenticate, authorize('Admin'), multipleFilesController.uploadFiles);

module.exports = router;