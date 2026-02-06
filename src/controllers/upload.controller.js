const path = require('path');
const upload = require('../config/multer.config');

const uploadSingle = upload.single('file');

exports.uploadImage = (req, res) => {
  uploadSingle(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const url = '/uploads/' + req.file.filename;
    res.json({ url, filename: req.file.filename });
  });
};

exports.uploadPdf = (req, res) => {
  const pdfUpload = upload.single('file');
  pdfUpload(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    if (!req.file) return res.status(400).json({ error: 'No file' });
    const url = '/uploads/' + req.file.filename;
    res.json({ url, filename: req.file.filename });
  });
};
