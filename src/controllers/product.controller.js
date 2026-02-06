const { Product, ProductCategory } = require('../models');
const path = require('path');
const fs = require('fs');
const upload = require('../config/multer.config');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.category_id) where.category_id = req.query.category_id;
    const items = await Product.findAll({
      where,
      include: [{ model: ProductCategory, as: 'category', attributes: ['id', 'name'] }],
      order: [['id', 'ASC']]
    });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Product.findByPk(req.params.id, {
      include: [{ model: ProductCategory, as: 'category', attributes: ['id', 'name'] }]
    });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    // Handle file uploads
    const uploadFields = upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'datasheet', maxCount: 1 }
    ]);
    
    uploadFields(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      try {
        const productData = { ...req.body };
        
        // Handle uploaded files
        if (req.files) {
          if (req.files.image && req.files.image[0]) {
            productData.image = req.files.image[0].filename;
          }
          if (req.files.pdf && req.files.pdf[0]) {
            productData.pdf = req.files.pdf[0].filename;
          }
          if (req.files.datasheet && req.files.datasheet[0]) {
            productData.datasheet = req.files.datasheet[0].filename;
          }
        }
        
        const item = await Product.create(productData);
        res.status(201).json(item);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    
    // Handle file uploads
    const uploadFields = upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'pdf', maxCount: 1 },
      { name: 'datasheet', maxCount: 1 }
    ]);
    
    uploadFields(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      
      try {
        const productData = { ...req.body };
        
        // Handle uploaded files
        if (req.files) {
          if (req.files.image && req.files.image[0]) {
            // Delete old image if exists
            if (item.image) {
              const oldImagePath = path.join(__dirname, '../../uploads', item.image);
              if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
              }
            }
            productData.image = req.files.image[0].filename;
          }
          if (req.files.pdf && req.files.pdf[0]) {
            // Delete old pdf if exists
            if (item.pdf) {
              const oldPdfPath = path.join(__dirname, '../../uploads', item.pdf);
              if (fs.existsSync(oldPdfPath)) {
                fs.unlinkSync(oldPdfPath);
              }
            }
            productData.pdf = req.files.pdf[0].filename;
          }
          if (req.files.datasheet && req.files.datasheet[0]) {
            // Delete old datasheet if exists
            if (item.datasheet) {
              const oldDatasheetPath = path.join(__dirname, '../../uploads', item.datasheet);
              if (fs.existsSync(oldDatasheetPath)) {
                fs.unlinkSync(oldDatasheetPath);
              }
            }
            productData.datasheet = req.files.datasheet[0].filename;
          }
        }
        
        await item.update(productData);
        res.json(item);
      } catch (e) {
        res.status(500).json({ message: e.message });
      }
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Product.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    
    // Delete associated files
    const uploadPath = path.join(__dirname, '../../uploads');
    
    if (item.image) {
      const imagePath = path.join(uploadPath, item.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    if (item.pdf) {
      const pdfPath = path.join(uploadPath, item.pdf);
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath);
      }
    }
    
    if (item.datasheet) {
      const datasheetPath = path.join(uploadPath, item.datasheet);
      if (fs.existsSync(datasheetPath)) {
        fs.unlinkSync(datasheetPath);
      }
    }
    
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
