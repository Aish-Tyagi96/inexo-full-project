const { StatusCode } = require('../../constants/HttpStatusCode');
const { createSingleUpload, toPublicUploadPath } = require('../../utils/upload');

const upload = createSingleUpload({
  fieldName: 'uploadImage',
  folderName: 'images',
  fileMatcher(file) {
    return file.mimetype.startsWith('image/');
  },
  maxFileSize: 5 * 1024 * 1024,
  errorMessage: 'Images only (jpeg, jpg, png, gif, svg, webp, ico).',
});

exports.uploadImage = (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(StatusCode.BAD_REQUEST.code).json({
        success: false,
        message: error.message,
      });
    }

    if (!req.file) {
      return res.status(StatusCode.BAD_REQUEST.code).json({
        success: false,
        message: 'No image uploaded.',
      });
    }

    return res.status(StatusCode.CREATED.code).json({
      success: true,
      message: 'Image uploaded successfully.',
      data: {
        imageUrl: toPublicUploadPath('images', req.file.filename),
      },
    });
  });
};