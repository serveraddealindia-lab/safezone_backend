const contactService = require('../services/contact.service');

const createContactLead = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required' });
    }
    
    const contactLead = await contactService.createContactLead({
      name,
      email,
      phone,
      subject,
      message
    });
    
    res.status(201).json({
      message: 'Contact form submitted successfully',
      id: contactLead.id
    });
  } catch (error) {
    console.error('Create contact lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllContactLeads = async (req, res) => {
  try {
    const contactLeads = await contactService.getAllContactLeads();
    res.status(200).json({ data: contactLeads });
  } catch (error) {
    console.error('Get all contact leads error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getContactLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactLead = await contactService.getContactLeadById(id);
    
    if (!contactLead) {
      return res.status(404).json({ error: 'Contact lead not found' });
    }
    
    res.status(200).json({ data: contactLead });
  } catch (error) {
    console.error('Get contact lead by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateContactLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'contacted', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    const contactLead = await contactService.updateContactLeadStatus(id, status);
    
    if (!contactLead) {
      return res.status(404).json({ error: 'Contact lead not found' });
    }
    
    res.status(200).json({
      message: 'Contact lead status updated successfully',
      data: contactLead
    });
  } catch (error) {
    console.error('Update contact lead status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteContactLead = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await contactService.deleteContactLead(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Contact lead not found' });
    }
    
    res.status(200).json({ message: 'Contact lead deleted successfully' });
  } catch (error) {
    console.error('Delete contact lead error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createContactLead,
  getAllContactLeads,
  getContactLeadById,
  updateContactLeadStatus,
  deleteContactLead
};

