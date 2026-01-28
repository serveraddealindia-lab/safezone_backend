const projectService = require('../services/project.service');

const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ data: projects });
  } catch (error) {
    console.error('Get all projects error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(200).json({ data: project });
  } catch (error) {
    console.error('Get project by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const project = await projectService.createProject(projectData);
    
    res.status(201).json({
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const project = await projectService.updateProject(id, updateData);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(200).json({
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await projectService.deleteProject(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectsByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const projects = await projectService.getProjectsByCountry(country);
    res.status(200).json({ data: projects });
  } catch (error) {
    console.error('Get projects by country error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const projects = await projectService.getProjectsByStatus(status);
    res.status(200).json({ data: projects });
  } catch (error) {
    console.error('Get projects by status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const projects = await projectService.getProjectsByCategory(category);
    res.status(200).json({ data: projects });
  } catch (error) {
    console.error('Get projects by category error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCountry,
  getProjectsByStatus,
  getProjectsByCategory
};