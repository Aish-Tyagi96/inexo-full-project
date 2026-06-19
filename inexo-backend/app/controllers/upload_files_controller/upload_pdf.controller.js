const { StatusCode } = require('../../constants/HttpStatusCode');
const { createSingleUpload, toPublicUploadPath } = require('../../utils/upload');

const upload = createSingleUpload({
  fieldName: 'uploadPdf',
  folderName: 'pdfs',
  fileMatcher(file) {
    return file.mimetype.includes('pdf');
  },
  maxFileSize: 20 * 1024 * 1024,
  errorMessage: 'PDF files only.',
});

exports.uploadPdf = (req, res) => {
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
        message: 'No PDF uploaded.',
      });
    }

    return res.status(StatusCode.CREATED.code).json({
      success: true,
      message: 'PDF uploaded successfully.',
      data: {
        pdfUrl: toPublicUploadPath('pdfs', req.file.filename),
      },
    });
  });
};