'use strict'

const multer = require('multer')
const path = require('path')

const imageFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        cb("Only image file allowed.", false);
    } else {
        cb(null, true);
    }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  "./public/uploads/image")
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

// console.log(path.dirname)

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;