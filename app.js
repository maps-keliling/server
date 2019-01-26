require('dotenv').config()
const express = require('express');
const cors = require('cors')
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user')
const mongoose = require('mongoose');

mongoose.connect(process.env.MLAB, { useNewUrlParser: true });
const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', userRouter)


module.exports = app;
