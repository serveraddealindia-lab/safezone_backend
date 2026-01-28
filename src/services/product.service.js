const { Product, ProductCategory } = require('../models');

const getAllProducts = async () => {
  return await Product.findAll({
    include: [{
      model: ProductCategory,
      as: 'category',
      attributes: ['id', 'name']
    }],
    order: [['id', 'ASC']]
  });
};

const getProductById = async (id) => {
  return await Product.findByPk(id, {
    include: [{
      model: ProductCategory,
      as: 'category',
      attributes: ['id', 'name']
    }]
  });
};

const createProduct = async (data) => {
  return await Product.create(data);
};

const updateProduct = async (id, data) => {
  const product = await Product.findByPk(id);
  if (!product) {
    return null;
  }
  await product.update(data);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByPk(id);
  if (!product) {
    return false;
  }
  await product.destroy();
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};

