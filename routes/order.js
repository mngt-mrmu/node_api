const express = require('express');
const router = express.Router();
const order_model = require('../models/order');
const verifyToken = require('../controllers/verifyToken');

router.post('/', verifyToken, (req, res, next) => {
  const order = new order_model({
    product: req.fields.id,
    quantity: req.fields.quantity,
    user: id,
  });

  order
    .save()
    .then((order) => {
      res.json({
        status: 'success',
        order: order,
      });
    })
    .catch((err) => res.json({ err }));
});

router.get('/', verifyToken, (req, res, next) => {
  order_model
    .find({ user: id })
    .populate('product')
    .then((result) => {
      res.json({
        status: 'success',
        orders: result,
      });
    })
    .catch((err) => res.json({ err }));
});

router.patch('/', verifyToken, (req, res, next) => {
  const id = req.fields.id;
  const body = req.fields;
  delete body.id;
  // console.log(body);
  order_model
    .findByIdAndUpdate(id, body, { new: true })
    .then((result) => {
      res.json({
        status: 'success',
        order: result,
      });
    })
    .catch((err) => res.json({ err }));
});

router.delete('/', verifyToken, (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  order_model
    .findByIdAndDelete(id)
    .then(() => {
      res.json({
        status: 'success',
        message: 1,
      });
    })
    .catch((err) => res.json({ err }));
});

module.exports = router;
