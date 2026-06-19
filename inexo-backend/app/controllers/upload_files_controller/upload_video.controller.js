const { StatusCode } = require('../../constants/HttpStatusCode');
const { createSingleUpload, toPublicUploadPath } = require('../../utils/upload');

const upload = createSingleUpload({
  fieldName: 'uploadVideo',
  folderName: 'videos',
  fileMatcher(file) {
    return file.mimetype.startsWith('video/');
  },
  maxFileSize: 100 * 1024 * 1024,
  errorMessage: 'Video files only.',
});

exports.uploadVideo = (req, res) => {
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
        message: 'No video uploaded.',
      });
    }

    return res.status(StatusCode.CREATED.code).json({
      success: true,
      message: 'Video uploaded successfully.',
      data: {
        videoUrl: toPublicUploadPath('videos', req.file.filename),
      },
    });
  });
};