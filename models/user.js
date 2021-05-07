const mongoose = require('mongoose');

const userdataSchema = mongoose.Schema({
  email: {
    type: String,
  },

  phone_no: {
    type: String,
  },

  password: {
    type: String,
  },

  otp: {
    type: Number,
  },

  name: {
    type: String,
    //name to be shown
  },

  user_image: {
    type: String,
  },

  user_type: {
    type: String,
  },

  auth_scope: {
    type: String,
  },

  user_location: {
    type: String,
  },

  shop_name: {
    type: String,
  },

  shop_categary: {
    type: String,
  },

  shop_location: {
    type: String,
  },

  products: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }],
  },

  orders: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'order' }],
  },
});

module.exports = mongoose.model('user', userdataSchema);
