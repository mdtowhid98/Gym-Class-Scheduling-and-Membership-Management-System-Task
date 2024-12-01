const express = require('express');
const { registerUser, loginUser, createAdmin} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/create-admin', createAdmin);
router.post('/login', loginUser);

module.exports = router;
