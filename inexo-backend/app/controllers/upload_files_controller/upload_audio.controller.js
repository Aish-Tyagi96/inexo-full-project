const { StatusCode } = require('../../constants/HttpStatusCode');
const { createSingleUpload, toPublicUploadPath } = require('../../utils/upload');

const upload = createSingleUpload({
  fieldName: 'uploadAudio',
  folderName: 'audios',
  fileMatcher(file) {
    return file.mimetype.startsWith('audio/');
  },
  maxFileSize: 25 * 1024 * 1024,
  errorMessage: 'Audio files only.',
});

exports.uploadAudio = (req, res) => {
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
        message: 'No audio uploaded.',
      });
    }

    return res.status(StatusCode.CREATED.code).json({
      success: true,
      message: 'Audio uploaded successfully.',
      data: {
        audioUrl: toPublicUploadPath('audios', req.file.filename),
      },
    });
  });
};