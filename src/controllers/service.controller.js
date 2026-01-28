const serviceService = require('../services/service.service');

const getAllServices = async (req, res) => {
  try {
    const services = await serviceService.getAllServices();
    res.status(200).json(services);
  } catch (error) {
    console.error('Get all services error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await serviceService.getServiceById(id);
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error('Get service by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const service = await serviceService.createService({ name, description, icon, image });
    res.status(201).json(service);
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;
    if (image) updateData.image = image;
    
    const service = await serviceService.updateService(id, updateData);
    
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json(service);
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await serviceService.deleteService(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};

