const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use('/images/', express.static(path.join(__dirname, 'images')));
app.use('/api/auth/', authRoutes);
app.use('/api/sauces/', sauceRoutes);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100}));
app.use(cors({origin: 'http://localhost:4200'}));

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

module.exports = app;
