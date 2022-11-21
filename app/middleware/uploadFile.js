const multer = require('multer');
const path = require('path').resolve('./');

const validateFile = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya menerima file gambar'));
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${path}/storage/uploads/static/`);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const fileName = `${Math.random()
      .toString(36)
      .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}${ext}`;
    cb(null, fileName);
  },
});

const uploadFile = multer({
  storage,
  fileFilter: validateFile,
});

module.exports = uploadFile;
