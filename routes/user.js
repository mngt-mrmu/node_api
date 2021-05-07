const express = require('express');
const router = express.Router();
const verifyToken = require('../controllers/verifyToken');
const user_model = require('../models/user');
const {
  getUserData,
  generateToken,
  hashPassword,
  checkPassword,
  generateOTP,
  parseUsername,
} = require('../utils/user');

router.post('/oauth', async (req, res, next) => {
  try {
    const { apiUrl, access_token } = req.fields;
    const { data } = await getUserData(apiUrl, access_token); //get userData from google api
    const { email, name } = data;

    const query = { email },
      update = { name, email, auth_scope: 'oauth' },
      options = { new: true, upsert: true, setDefaultsOnInsert: true };
    const docs = await user_model.findOneAndUpdate(query, update, options);

    const token = generateToken(docs._id);
    res.json({
      success: 'success',
      userId: docs._id,
      name: docs.name,
      access_token: token,
      message: 'Oauth Success',
    });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, name, password } = req.fields;
    const parsedUsername = parseUsername(username);
    const { email, phone_no } = parsedUsername;

    const query = parsedUsername;
    var docs = await user_model.findOne(query); //check if user exist

    if (docs) {
      //if user exist
      res.json({
        message: 'This email or phone_no is already in use',
      });
    } else {
      const hash = await hashPassword(password);
      const user = new user_model({
        email,
        phone_no,
        name,
        password: hash,
      });

      docs = await user.save();
      const token = generateToken(docs._id);

      res.json({
        success: 'success',
        userId: docs._id,
        name: docs.name,
        access_token: token,
        message: 'Registration success',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const { username, password } = req.fields;
    const parsedUsername = parseUsername(username);
    const query = parsedUsername;
    const docs = await user_model.findOne(query);
    if (docs) {
      const isPass = await checkPassword(password, docs.password);
      if (isPass) {
        const token = generateToken(docs._id);
        res.json({
          success: 'success',
          userId: docs._id,
          name: docs.name,
          access_token: token,
          message: 'Login success',
        });
      } else {
        res.json({
          message: 'Incorrect password',
        });
      }
    } else {
      res.send({
        message: "User doesn't exist",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/forgot', async (req, res, next) => {
  try {
    const { username } = req.fields;
    const parsedUsername = parseUsername(username);
    const otp = generateOTP();

    const query = parsedUsername,
      update = { otp },
      options = { new: true, setDefaultsOnInsert: true };

    const docs = await user_model.findOneAndUpdate(query, update, options);

    if (docs) {
      return res.json({
        success: 'success',
        otp,
        message: 'One Time Password(OTP):' + otp,
      });
    } else {
      res.json({
        message: 'No account available !',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post('/reset', async (req, res, next) => {
  try {
    const { username, otp, password } = req.fields;
    const parsedUsername = parseUsername(username);
    const hash = await hashPassword(password);

    const query = { $and: [parsedUsername, { otp }] },
      update = { password: hash, otp: null },
      options = { new: true, setDefaultsOnInsert: true };

    const docs = await user_model.findOneAndUpdate(query, update, options);

    if (docs) {
      return res.json({
        success: 'success',
        message: 'Password reset success. Now try login ',
      });
    } else {
      res.json({
        message: 'No account available or wrong OTP',
      });
    }
  } catch (err) {
    next(err);
  }
});

router.get('/refreshUser', verifyToken, async (req, res, next) => {
  try {
    const docs = await user_model.findById(id);
    const token = generateToken(userId);
    res.json({
      success: 'success',
      id: docs._id,
      name: docs.name,
      access_token: token,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/getuser', verifyToken, async (req, res, next) => {
  try {
    const docs = await user_model.findById(id);

    res.json({
      success: 'success',
      userId: docs._id,
      name: docs.name,
      email: docs.email,
      phone_no: docs.phone_no,
      location: docs.location,
    });
  } catch (err) {
    next(err);
  }
});

router.patch('/update', verifyToken, async (req, res, next) => {
  try {
    const update = req.fields;
    const options = { new: true, setDefaultsOnInsert: true, upsert: true };

    const docs = await user_model.findByIdAndUpdate(id, update, options);
    res.send({
      success: 'success',
      userId: docs._id,
      name: docs.name,
      email: docs.email,
      phone_no: docs.phone_no,
      location: docs.location,
      message: 'Updated successfully!',
    });
  } catch (err) {
    next(err);
  }
});

router.delete('/delete', verifyToken, async (req, res, next) => {
  try {
    const docs = await user_model.findByIdAndDelete(userId);

    res.json({
      success: 'success',
      message: 'Account deleted successfully',
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
