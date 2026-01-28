const path = require('path');

const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Construct the file URL
    const fileUrl = `/uploads/images/${req.file.filename}`;
    
    res.status(200).json({
      message: 'Image uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const uploadPDF = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file provided' });
    }

    // Construct the file URL
    const fileUrl = `/uploads/pdfs/${req.file.filename}`;
    
    res.status(200).json({
      message: 'PDF uploaded successfully',
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size
    });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ error: 'Failed to upload PDF' });
  }
};

module.exports = {
  uploadImage,
  uploadPDF
};

