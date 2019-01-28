const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name of item is required']
  },
  price: {
    type: Number,
    required: [true, 'Price of item is required'],
    min: [100, 'Minimum price of item is Rp. 100']
  },
  picture: {
    type: String,
  }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item