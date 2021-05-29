const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cors = require('cors');
const { mongodb_connect } = require('./utils/database');

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

//To handle cors policy.
app.use(cors());
// parse formData
app.use(formidable({ uploadDir: '../public/images', multiples: true }));

//database connection
mongodb_connect();

//To Serve Static HTML website from views directory
app.use(express.static(__dirname + '/views'));

//Routes
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/order');
const keywordRoute = require('./routes/keyword');

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/keyword', keywordRoute);

//Creating Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`app is listening at port ${port}`);
});
