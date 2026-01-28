const { ContactLead } = require('../models');

const createContactLead = async (data) => {
  return await ContactLead.create(data);
};

const getAllContactLeads = async () => {
  return await ContactLead.findAll({
    order: [['created_at', 'DESC']]
  });
};

const getContactLeadById = async (id) => {
  return await ContactLead.findByPk(id);
};

const updateContactLeadStatus = async (id, status) => {
  const contactLead = await ContactLead.findByPk(id);
  if (!contactLead) return null;
  
  return await contactLead.update({ status });
};

const deleteContactLead = async (id) => {
  const contactLead = await ContactLead.findByPk(id);
  if (!contactLead) return false;
  
  await contactLead.destroy();
  return true;
};

module.exports = {
  createContactLead,
  getAllContactLeads,
  getContactLeadById,
  updateContactLeadStatus,
  deleteContactLead
};

