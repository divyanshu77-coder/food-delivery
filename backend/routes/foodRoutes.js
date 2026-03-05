const express = require('express');
const { getFoods, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getFoods);
router.post('/', protect, admin, upload.single('image'), createFood);
router.put('/:id', protect, admin, upload.single('image'), updateFood);
router.delete('/:id', protect, admin, deleteFood);

module.exports = router;

