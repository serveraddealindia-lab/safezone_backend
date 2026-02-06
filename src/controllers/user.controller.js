const { User } = require('../models');
const bcrypt = require('bcrypt');

exports.getAll = async (req, res) => {
  try {
    const items = await User.findAll({ attributes: { exclude: ['password'] }, order: [['id', 'ASC']] });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    const updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    await item.update(updateData);
    const out = item.toJSON();
    delete out.password;
    res.json(out);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await User.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
