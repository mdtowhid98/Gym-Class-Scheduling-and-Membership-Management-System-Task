const { verifyToken } = require('../utils/jwtUtils');
const User = require('../models/user');

const protect = async (req, res, next) => {
  let token = req.header('Authorization');
  
  if (!token) {
    res.status(401).json({ message: 'Unauthorized access.' });
    return;
  }

  token = token.replace('Bearer ', '');
  
  try {
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized access.' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access.' });
  }
};

module.exports = { protect };
