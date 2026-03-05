const Food = require('../models/Food');

// @desc    Get foods with search, filter, pagination
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    // this 1000 is for previus 1000 foods added show in admin panel and at home page its grid divided into 3 line after 1000 foods.
    const limit = Number(req.query.limit) || 1000;
    const skip = (page - 1) * limit;

    const category = req.query.category || '';
    const search = req.query.search || '';

    const query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const [foods, total] = await Promise.all([
      Food.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Food.countDocuments(query)
    ]);

    return res.json({
      foods,
      page,
      pages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create food (admin)
// @route   POST /api/foods
// @access  Admin
const createFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image: `/uploads/${req.file.filename}`
    });

    return res.status(201).json(food);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update food (admin)
// @route   PUT /api/foods/:id
// @access  Admin
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    food.name = name || food.name;
    food.description = description || food.description;
    food.price = price || food.price;
    food.category = category || food.category;

    if (req.file) {
      food.image = `/uploads/${req.file.filename}`;
    }

    const updatedFood = await food.save();

    return res.json(updatedFood);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete food (admin)
// @route   DELETE /api/foods/:id
// @access  Admin
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    const food = await Food.findById(id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    await food.deleteOne();

    return res.json({ message: 'Food removed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getFoods,
  createFood,
  updateFood,
  deleteFood
};

