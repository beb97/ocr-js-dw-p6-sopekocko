const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

var cors = require('cors');

const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

const app = express();

mongoose.connect(
    process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // = 15 minutes
    max: 100
})

app.use(limiter);

app.use(cors({origin: 'http://localhost:4200'}));

app.use('/images/', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);
app.use('/api/sauces/', sauceRoutes);

module.exports = app;
