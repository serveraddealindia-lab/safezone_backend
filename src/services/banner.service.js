const { Banner } = require('../models');

const getAllBanners = async () => {
  return await Banner.findAll({
    order: [['order_no', 'ASC'], ['id', 'ASC']]
  });
};

const getBannerById = async (id) => {
  return await Banner.findByPk(id);
};

const createBanner = async (data) => {
  return await Banner.create(data);
};

const updateBanner = async (id, data) => {
  const banner = await Banner.findByPk(id);
  if (!banner) {
    return null;
  }
  await banner.update(data);
  return banner;
};

const deleteBanner = async (id) => {
  const banner = await Banner.findByPk(id);
  if (!banner) {
    return false;
  }
  await banner.destroy();
  return true;
};

module.exports = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
};

