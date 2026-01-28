const productService = require('../services/product.service');

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { category_id, name, short_desc, long_desc, pdf, datasheet } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!category_id || !name) {
      return res.status(400).json({ error: 'Category ID and name are required' });
    }
    
    const product = await productService.createProduct({
      category_id,
      name,
      short_desc,
      long_desc,
      image,
      pdf,
      datasheet
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, short_desc, long_desc, pdf, datasheet } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateData = {};
    if (category_id !== undefined) updateData.category_id = category_id;
    if (name !== undefined) updateData.name = name;
    if (short_desc !== undefined) updateData.short_desc = short_desc;
    if (long_desc !== undefined) updateData.long_desc = long_desc;
    if (image) updateData.image = image;
    if (pdf !== undefined) updateData.pdf = pdf;
    if (datasheet !== undefined) updateData.datasheet = datasheet;
    
    const product = await productService.updateProduct(id, updateData);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const uploadDatasheet = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Construct the file URL
    const datasheetUrl = `${req.protocol}://${req.get('host')}/uploads/datasheets/${req.file.filename}`;
    
    // Update product with datasheet URL
    const product = await productService.updateProduct(id, { datasheet: datasheetUrl });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({
      message: 'Datasheet uploaded successfully',
      datasheet: datasheetUrl
    });
  } catch (error) {
    console.error('Upload datasheet error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadDatasheet
};

