const Order = require('../models/Order');

// @desc    Create order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, paymentStatus } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    if (!totalAmount) {
      return res.status(400).json({ message: 'Total amount is required' });
    }

    const formattedItems = items.map((item) => ({
      food: item.foodId,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));

    const order = await Order.create({
      userId: req.user._id,
      items: formattedItems,
      totalAmount,
      paymentStatus: paymentStatus || 'paid'
    });

    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/user
// @access  Private
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all orders (admin)
// @route   GET /api/orders/admin
// @access  Admin
const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update order status (admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({ message: 'Order status is required' });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.orderStatus = orderStatus;

    const updatedOrder = await order.save();

    return res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAdminOrders,
  updateOrderStatus
};

