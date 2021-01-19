const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');

const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const sauceRoutes = require('./routes/sauce');

const app = express();

mongoose.connect(
  'mongodb+srv://sauce_w_r:piquante@cluster0.vm6sx.mongodb.net/piquante?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(cors());

app.use('/images/', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth/', authRoutes);
app.use('/api/sauces/', sauceRoutes);
app.use('/', indexRoutes);

module.exports = app;
