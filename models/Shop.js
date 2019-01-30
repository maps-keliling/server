const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Name of brand is required']
  },
  itemList: [{
    type: Schema.Types.ObjectId,
    ref: 'Item'
  }]
})

const Shop = mongoose.model('Shop', shopSchema)

module.exports = Shop