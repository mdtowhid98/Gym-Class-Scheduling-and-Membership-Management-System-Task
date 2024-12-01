const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

// Route for getting all classes
router.get('/', classController.getAllClasses);

// Route for creating a new class
router.post('/', classController.createClass);

// Route for getting a specific class by ID
router.get('/:id', classController.getClassById);

// Route for updating a class
router.put('/:id', classController.updateClass);

// Route for deleting a class by ID
router.delete('/:id', classController.deleteClass);

module.exports = router;
