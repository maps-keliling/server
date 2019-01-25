require('dotenv').config()
const express = require('express');
const cors = require('cors')
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/keliling', { useNewUrlParser: true });
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


module.exports = app;
