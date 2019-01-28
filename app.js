require('dotenv').config()
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

// router
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user')
const itemRouter = require('./routes/item')
const shopRouter = require('./routes/shop')

// console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'TEST') {
  mongoose.connect("mongodb://localhost/inginJajanTest", { useNewUrlParser: true });
} else {
  mongoose.connect(process.env.MLAB, { useNewUrlParser: true });
}

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', userRouter)
app.use('/items', itemRouter)
app.use('/shop', shopRouter)


module.exports = app;
