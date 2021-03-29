const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

module.exports = Item = mongoose.model('item', ItemSchema);
