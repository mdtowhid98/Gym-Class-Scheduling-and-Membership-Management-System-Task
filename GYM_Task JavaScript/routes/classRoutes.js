const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');
const { protect } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');

// Public route to view all classes
router.get('/', protect, classController.getAllClasses);

// Protected route to get specific class details
router.get('/:id', protect, classController.getClassById);

// Admin-only routes for class management
router.post('/', protect, isAdmin, classController.createClass);
router.put('/:id', protect, isAdmin, classController.updateClass);
router.delete('/:id', protect, isAdmin, classController.deleteClass);

module.exports = router;