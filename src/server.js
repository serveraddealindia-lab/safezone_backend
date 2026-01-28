require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const healthRoutes = require('./routes/health.routes');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const marketRoutes = require('./routes/market.routes');
const serviceRoutes = require('./routes/service.routes');
const bannerRoutes = require('./routes/banner.routes');
const uploadRoutes = require('./routes/upload.routes');
const careerRoutes = require('./routes/career.routes');
const contactRoutes = require('./routes/contact.routes');
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('SafeZone Backend is running 🚀');
});

app.get('/health', async (req, res) => {
  try {
    res.json({ status: 'OK', message: 'Backend running' });
  } catch (e) {
    res.status(500).json({ status: 'ERROR' });
  }
});
app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/markets', marketRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/banners', bannerRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/careers', careerRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);

// Error handling middleware for multer errors
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large' });
    }
    return res.status(400).json({ error: error.message });
  }
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  next();
});

// Sync database and start server
const startServer = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log('Database tables synced successfully.');
    
    app.get('/api/products', async (req, res) => {
      try {
        const { Product } = require('./models');
        const products = await Product.findAll();
        res.status(200).json(products);
      } catch (error) {
        console.error('Products fetch error:', error);
        res.status(500).json({ message: 'Failed to load products' });
      }
    });

// Start server
    app.listen(PORT, () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

