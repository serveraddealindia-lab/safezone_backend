const { ProductCategory } = require('../models');

const getAllCategories = async () => {
  return await ProductCategory.findAll({
    order: [['id', 'ASC']]
  });
};

const getCategoryById = async (id) => {
  return await ProductCategory.findByPk(id);
};

const createCategory = async (data) => {
  return await ProductCategory.create(data);
};

const updateCategory = async (id, data) => {
  const category = await ProductCategory.findByPk(id);
  if (!category) {
    return null;
  }
  await category.update(data);
  return category;
};

const deleteCategory = async (id) => {
  const category = await ProductCategory.findByPk(id);
  if (!category) {
    return false;
  }
  await category.destroy();
  return true;
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};

