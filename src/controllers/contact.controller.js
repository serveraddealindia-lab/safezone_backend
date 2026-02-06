const { ContactLead } = require('../models');

exports.submit = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const lead = await ContactLead.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Thank you. We will contact you soon.', id: lead.id });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const items = await ContactLead.findAll({ order: [['id', 'DESC']] });
    res.json(items);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = await ContactLead.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await ContactLead.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(req.body);
    res.json(item);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await ContactLead.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
