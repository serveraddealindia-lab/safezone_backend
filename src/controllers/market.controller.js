const marketService = require('../services/market.service');

const getAllMarkets = async (req, res) => {
  try {
    const markets = await marketService.getAllMarkets();
    res.status(200).json(markets);
  } catch (error) {
    console.error('Get all markets error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getMarketById = async (req, res) => {
  try {
    const { id } = req.params;
    const market = await marketService.getMarketById(id);
    
    if (!market) {
      return res.status(404).json({ error: 'Market not found' });
    }
    
    res.status(200).json(market);
  } catch (error) {
    console.error('Get market by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createMarket = async (req, res) => {
  try {
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const market = await marketService.createMarket({ name, description, image });
    res.status(201).json(market);
  } catch (error) {
    console.error('Create market error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateMarket = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (image) updateData.image = image;
    
    const market = await marketService.updateMarket(id, updateData);
    
    if (!market) {
      return res.status(404).json({ error: 'Market not found' });
    }
    
    res.status(200).json(market);
  } catch (error) {
    console.error('Update market error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteMarket = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await marketService.deleteMarket(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Market not found' });
    }
    
    res.status(200).json({ message: 'Market deleted successfully' });
  } catch (error) {
    console.error('Delete market error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllMarkets,
  getMarketById,
  createMarket,
  updateMarket,
  deleteMarket
};

