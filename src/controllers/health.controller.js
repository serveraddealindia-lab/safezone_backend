exports.checkHealth = async (req, res) => {
  try {
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'ERROR' });
  }
};
