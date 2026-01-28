const { Project } = require('../models');

const getAllProjects = async () => {
  return await Project.findAll({
    order: [['created_at', 'DESC']]
  });
};

const getProjectById = async (id) => {
  return await Project.findByPk(id);
};

const createProject = async (projectData) => {
  return await Project.create(projectData);
};

const updateProject = async (id, updateData) => {
  const project = await Project.findByPk(id);
  if (!project) {
    return null;
  }
  
  await project.update(updateData);
  return await Project.findByPk(id);
};

const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (!project) {
    return false;
  }
  
  await project.destroy();
  return true;
};

const getProjectsByCountry = async (country) => {
  return await Project.findAll({
    where: { country },
    order: [['created_at', 'DESC']]
  });
};

const getProjectsByStatus = async (status) => {
  return await Project.findAll({
    where: { status },
    order: [['created_at', 'DESC']]
  });
};

const getProjectsByCategory = async (category) => {
  return await Project.findAll({
    where: { category },
    order: [['created_at', 'DESC']]
  });
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