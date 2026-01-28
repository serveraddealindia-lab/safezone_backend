const bannerService = require('../services/banner.service');

const getAllBanners = async (req, res) => {
  try {
    const banners = await bannerService.getAllBanners();
    res.status(200).json(banners);
  } catch (error) {
    console.error('Get all banners error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await bannerService.getBannerById(id);
    
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    
    res.status(200).json(banner);
  } catch (error) {
    console.error('Get banner by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createBanner = async (req, res) => {
  try {
    const { title, subtitle, link, order_no, status } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    const banner = await bannerService.createBanner({ title, subtitle, link, image, order_no, status });
    res.status(201).json(banner);
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, link, order_no, status } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (link !== undefined) updateData.link = link;
    if (image) updateData.image = image;
    if (order_no !== undefined) updateData.order_no = order_no;
    if (status !== undefined) updateData.status = status;
    
    const banner = await bannerService.updateBanner(id, updateData);
    
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    
    res.status(200).json(banner);
  } catch (error) {
    console.error('Update banner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await bannerService.deleteBanner(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllBanners,
  getBannerById,
  createBanner,
  updateBanner,
  deleteBanner
};

