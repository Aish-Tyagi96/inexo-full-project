const { StatusCode } = require('../../constants/HttpStatusCode');
const { createMultipleUpload, detectFolder, toPublicUploadPath } = require('../../utils/upload');

const upload = createMultipleUpload({
  fieldName: 'uploadFiles',
  maxCount: 10,
});

exports.uploadFiles = (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(StatusCode.BAD_REQUEST.code).json({
        success: false,
        message: error.message,
      });
    }

    if (!req.files?.length) {
      return res.status(StatusCode.BAD_REQUEST.code).json({
        success: false,
        message: 'No files uploaded.',
      });
    }

    const files = req.files.map((file) => {
      const folderName = detectFolder(file);
      const fileType = folderName === 'pdfs' ? 'pdf' : folderName === 'videos' ? 'video' : folderName === 'audios' ? 'audio' : 'image';

      return {
        fileName: file.filename,
        fileType,
        fileUrl: toPublicUploadPath(folderName, file.filename),
      };
    });

    return res.status(StatusCode.CREATED.code).json({
      success: true,
      message: 'Files uploaded successfully.',
      data: {
        files,
      },
    });
  });
};