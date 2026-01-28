const { User } = require('../models');
const bcrypt = require('bcrypt');

const getAllUsers = async () => {
  // Exclude password from results
  return await User.findAll({
    attributes: { exclude: ['password'] },
    order: [['id', 'DESC']]
  });
};

const getUserById = async (id) => {
  // Exclude password from result
  return await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
};

const createUser = async (userData) => {
  const { name, email, password, role } = userData;
  
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Hash password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  
  // Create user
  return await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user'
  });
};

const updateUser = async (id, updateData) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  
  // If password is being updated, hash it
  if (updateData.password) {
    const saltRounds = 10;
    updateData.password = await bcrypt.hash(updateData.password, saltRounds);
  }
  
  await user.update(updateData);
  
  // Return user without password
  const updatedUser = await User.findByPk(id, {
    attributes: { exclude: ['password'] }
  });
  
  return updatedUser;
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  
  await user.destroy();
  return true;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};