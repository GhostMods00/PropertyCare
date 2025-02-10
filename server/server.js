const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const helmet = require('helmet');

const morgan = require('morgan');

const connectDB = require('./config/db');

// Load env vars

dotenv.config();

// Connect to database

connectDB();

const app = express();

// Middleware

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Logger

if (process.env.NODE_ENV === 'development') {

  app.use(morgan('dev'));

}

// Routes (I'll add these next)

app.get('/', (req, res) => {

  res.json({ message: 'Welcome to Property Care API' });

});

// Error handler middleware (I'll create this later)

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({

    success: false,

    error: err.message || 'Server Error'

  });

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);

});