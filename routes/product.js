const express = require('express');
const router = express.Router();
const product_model = require('../models/product');
const verifyToken = require('../controllers/verifyToken');
const { saveImages } = require('../utils/product');

router.post('/', verifyToken, async (req, res, next) => {
  const fields = JSON.parse(req.fields.json);
  const files = req.files;
  fields.seller = userId;
  // console.log(fields);

  const product = new product_model(fields);
  product.images = await saveImages(product._id, files, fields.images);

  product
    .save()
    .then((docs) => {
      res.json({
        status: 'success',
        product: docs,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/all', (req, res, next) => {
  product_model
    .find()
    .then((products) => {
      res.json({
        status: 'success',
        products: products,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/category', (req, res, next) => {
  const category = req.query.category;
  product_model
    .find({ category })
    .then((products) => {
      res.json({
        status: 'success',
        products: products,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/id', (req, res, next) => {
  const productId = req.query.id;
  product_model
    .findById(productId)
    .then((product) => {
      res.json({
        status: 'success',
        product: product,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/search', (req, res, next) => {
  const query = req.query.query;
  const pattern = new RegExp(`^${query}`, 'i');
  product_model
    .find({ keywords: { $elemMatch: { $regex: pattern } } })
    .then((products) => {
      res.json({
        status: 'success',
        products: products,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/header', verifyToken, (req, res, next) => {
  const seller = userId;
  product_model
    .find({ seller })
    .then((products) => {
      res.json({
        status: 'success',
        products: products,
      });
    })
    .catch((err) => res.json({ err }));
});

router.patch('/patch', verifyToken, (req, res, next) => {
  const id = req.query.id;
  product_model
    .findByIdAndUpdate(id, req.body, { new: true })
    .then((product) => {
      res.json({
        status: 'success',
        product: product,
      });
    })
    .catch((err) => res.json({ err }));
});

router.delete('/delete', verifyToken, (req, res, next) => {
  const id = req.query.id;
  product_model
    .findByIdAndDelete(id)
    .then(() => {
      res.json({
        status: 'success',
        message: 'deleted successfully',
      });
    })
    .catch((err) => res.json({ err }));
});

module.exports = router;
