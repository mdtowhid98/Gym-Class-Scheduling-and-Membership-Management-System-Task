const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'secret_key', { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, 'secret_key');
};

module.exports = { generateToken, verifyToken };
