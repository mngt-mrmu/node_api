const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: {
    type: String,
  },

  price: {
    type: {
      selling_price: Number,
      mrp_price: Number,
    },
  },

  images: {
    type: [String],
  },

  category: {
    type: String,
    // mobile and accesaries
  },

  keywords: {
    type: [String],
    // ['4g mobile','4gb ram mobile','samsung galaxy j2','...']
  },

  variant: {
    type: Object,
    // {
    //   color: [{value: 'red', productId:'id'}, {value: 'blue',productId:'id' }],
    //   size : [{value: 'small',productId:'id'},{value: 'large',productId:'id'}]
    // }
  },

  highlights: {
    type: [String],
  },

  description: {
    type: String,
    // may be html if required
  },

  specifications: {
    type: [[String, String]],
    // [
    //   ['<sh>','general'],
    //   ['brand','india'],
    //   ['model','model']
    //   ['<sh>','dimention'],
    //   ['width','120cm'],
    //   ['height','90cm']
    // ]
  },

  faqs: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        question: String,
        answear: String,
      },
    ],
  },

  reviews: {
    type: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        rating: Number,
        review: String,
        images: Array,
      },
    ],
  },

  rating: {
    type: Number,
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = mongoose.model('product', productSchema);
