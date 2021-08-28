const jwt = require('jsonwebtoken');
const User = require('../models/User');

const checkAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (authHeader == null) {
    res.sendStatus(403);
    return;
  }

  const [type, token] = authHeader.split(' ', 2);
  if (type === 'Bearer') {
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        User.findById(data.id, (err, user) => {
          req.user = user;
          next();
        });
      }
    });
  }
};

module.exports = checkAuth;
