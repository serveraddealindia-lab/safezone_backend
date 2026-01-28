const { Market } = require('../models');

const getAllMarkets = async () => {
  return await Market.findAll({
    order: [['id', 'ASC']]
  });
};

const getMarketById = async (id) => {
  return await Market.findByPk(id);
};

const createMarket = async (data) => {
  return await Market.create(data);
};

const updateMarket = async (id, data) => {
  const market = await Market.findByPk(id);
  if (!market) {
    return null;
  }
  await market.update(data);
  return market;
};

const deleteMarket = async (id) => {
  const market = await Market.findByPk(id);
  if (!market) {
    return false;
  }
  await market.destroy();
  return true;
};

module.exports = {
  getAllMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  deleteMarket
};

