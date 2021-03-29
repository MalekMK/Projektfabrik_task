const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema
const OrderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  }
});

module.exports = Order = mongoose.model('order', OrderSchema);
