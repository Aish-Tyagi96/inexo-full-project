const fs = require('node:fs');
const path = require('node:path');
const multer = require('multer');

function ensureUploadDir(folderName) {
  const folderPath = path.resolve(process.cwd(), 'uploads', folderName);
  fs.mkdirSync(folderPath, { recursive: true });
  return folderPath;
}

function createStorage(resolveFolder) {
  return multer.diskStorage({
    destination(req, file, callback) {
      const folderName = resolveFolder(file);

      if (!folderName) {
        callback(new Error('Unsupported file type.'));
        return;
      }

      callback(null, ensureUploadDir(folderName));
    },
    filename(_req, file, callback) {
      const extension = path.extname(file.originalname).toLowerCase();
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  });
}

function createSingleUpload({ fieldName, folderName, fileMatcher, maxFileSize, errorMessage }) {
  return multer({
    storage: createStorage(() => folderName),
    limits: { fileSize: maxFileSize },
    fileFilter(_req, file, callback) {
      if (fileMatcher(file)) {
        callback(null, true);
        return;
      }

      callback(new Error(errorMessage));
    },
  }).single(fieldName);
}

function createMultipleUpload({ fieldName, maxCount = 10, maxFileSize = 50 * 1024 * 1024 }) {
  return multer({
    storage: createStorage((file) => detectFolder(file)),
    limits: { fileSize: maxFileSize },
    fileFilter(_req, file, callback) {
      if (detectFolder(file)) {
        callback(null, true);
        return;
      }

      callback(new Error('Only images, videos, audios, and PDFs are allowed.'));
    },
  }).array(fieldName, maxCount);
}

function detectFolder(file) {
  const extension = path.extname(file.originalname).toLowerCase();

  if (file.mimetype.startsWith('image/') && /\.(jpeg|jpg|png|gif|svg|webp|ico)$/i.test(extension)) {
    return 'images';
  }

  if (file.mimetype.startsWith('video/') && /\.(mp4|mkv|avi|mov|webm)$/i.test(extension)) {
    return 'videos';
  }

  if (file.mimetype.startsWith('audio/') && /\.(mp3|wav|ogg|aac|m4a)$/i.test(extension)) {
    return 'audios';
  }

  if (file.mimetype.includes('pdf') && /\.pdf$/i.test(extension)) {
    return 'pdfs';
  }

  return null;
}

function toPublicUploadPath(folderName, fileName) {
  return `/uploads/${folderName}/${fileName}`;
}

module.exports = {
  createMultipleUpload,
  createSingleUpload,
  detectFolder,
  toPublicUploadPath,
};