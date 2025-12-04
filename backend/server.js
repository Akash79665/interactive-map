require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection with Atlas support
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/interactive-map';

console.log('🔄 Attempting to connect to MongoDB...');
console.log('📍 Connection type:', MONGODB_URI.includes('mongodb+srv') ? 'MongoDB Atlas' : 'Local MongoDB');

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log(`📊 Database: ${mongoose.connection.name}`);
  console.log(`🌐 Host: ${mongoose.connection.host}`);
})
.catch((err) => {
  console.error('❌ MongoDB Connection Error:', err.message);
  console.error('');
  console.error('💡 Troubleshooting:');
  console.error('   1. Check if MONGODB_URI is set in .env file');
  console.error('   2. Verify MongoDB Atlas password is correct');
  console.error('   3. Ensure IP 0.0.0.0/0 is whitelisted in MongoDB Atlas');
  console.error('');
  process.exit(1);
});

// Connection event handlers
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB error:', err.message);
});

// Routes
const locationsRouter = require('./routes/locations');
app.use('/api/locations', locationsRouter);

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Interactive Map API is running!',
    status: 'active',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    endpoints: {
      locations: '/api/locations',
      search: '/api/locations/search/:query',
      category: '/api/locations/category/:category',
      seed: '/api/locations/seed',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.json({
    status: 'ok',
    database: statusMap[dbStatus] || 'unknown',
    databaseName: mongoose.connection.name || 'N/A',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ================================');
  console.log(`   Server running on port ${PORT}`);
  console.log(`   📡 http://localhost:${PORT}`);
  console.log(`   🏥 Health: http://localhost:${PORT}/health`);
  console.log('   ================================');
  console.log('');
});