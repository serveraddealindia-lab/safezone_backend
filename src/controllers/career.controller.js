const careerService = require('../services/career.service');

const getAllCareers = async (req, res) => {
  try {
    const careers = await careerService.getAllCareers();
    
    res.status(200).json({ data: careers });
  } catch (error) {
    console.error('Get all careers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCareerById = async (req, res) => {
  try {
    const { id } = req.params;
    const career = await careerService.getCareerById(id);
    
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    res.status(200).json({ data: career });
  } catch (error) {
    console.error('Get career by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createCareer = async (req, res) => {
  try {
    const { title, department, location, type, description, requirements } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!title || !department) {
      return res.status(400).json({ error: 'Title and department are required' });
    }
    
    const career = await careerService.createCareer({
      title,
      department,
      location,
      type,
      description,
      requirements,
      image
    });
    
    res.status(201).json({
      message: 'Career created successfully',
      data: career
    });
  } catch (error) {
    console.error('Create career error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, department, location, type, description, requirements } = req.body;
    const image = req.file ? req.file.filename : null;
    
    const updateData = {
      title,
      department,
      location,
      type,
      description,
      requirements
    };
    
    if (image) updateData.image = image;
    
    const career = await careerService.updateCareer(id, updateData);
    
    if (!career) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    res.status(200).json({
      message: 'Career updated successfully',
      data: career
    });
  } catch (error) {
    console.error('Update career error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await careerService.deleteCareer(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Career not found' });
    }
    
    res.status(200).json({ message: 'Career deleted successfully' });
  } catch (error) {
    console.error('Delete career error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer
};

