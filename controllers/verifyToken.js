const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.JWT_KEY);
    id = userId = data.id || data.userId;
    scope = data.scope;
    next();
  } catch (err) {
    res.json({ err: 'Invalid token' });
  }
};
