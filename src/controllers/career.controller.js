const { Career } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const where = {};
    if (req.query.is_active !== undefined) where.is_active = req.query.is_active === 'true';
    const items = await Career.findAll({ where, order: [['id', 'DESC']] });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await Career.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await Career.create(req.body);
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await Career.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(req.body);
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await Career.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
