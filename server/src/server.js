require('module-alias/register');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const mainRouter = require('@src/routes/main');
const { formatError } = require('@src/utils/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Health ping for root
app.get('/', (req, res) => {
  res.json({ service: 'easyappz-backend', status: 'ok' });
});

// Mount API routes
app.use('/api', mainRouter);

// Not found handler
app.use((req, res) => {
  return res.status(404).json({ error: { message: 'Route not found', details: { method: req.method, path: req.originalUrl } } });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  const payload = formatError(err);
  return res.status(500).json(payload);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

async function start() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    // Continue running server, but API should inform about DB issues via endpoints
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
