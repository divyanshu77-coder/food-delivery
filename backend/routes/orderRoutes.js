const express = require('express');
const {
  createOrder,
  getUserOrders,
  getAdminOrders,
  updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/user', protect, getUserOrders);
router.get('/admin', protect, admin, getAdminOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;

