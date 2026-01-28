const { Career } = require('../models');

const getAllCareers = async () => {
  return await Career.findAll({
    where: { is_active: true },
    order: [['created_at', 'DESC']]
  });
};

const getCareerById = async (id) => {
  return await Career.findByPk(id);
};

const createCareer = async (data) => {
  return await Career.create(data);
};

const updateCareer = async (id, data) => {
  const career = await Career.findByPk(id);
  if (!career) {
    return null;
  }
  await career.update(data);
  return career;
};

const deleteCareer = async (id) => {
  const career = await Career.findByPk(id);
  if (!career) {
    return false;
  }
  await career.destroy();
  return true;
};

module.exports = {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer
};

