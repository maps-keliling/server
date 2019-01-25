require('dotenv').config()
const express = require('express');
const cors = require('cors')
const indexRouter = require('./routes/index');
const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:admin123@ds211865.mlab.com:11865/final-project', { useNewUrlParser: true });
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);


module.exports = app;
