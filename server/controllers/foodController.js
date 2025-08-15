import path from 'path';
import fs from 'fs';
import Food from '../models/Food.js';
import { countries } from 'countries-list';

// POST /api/foods
export const createFood = async (req, res) => {
  try {
    const { name, country, ingredients } = req.body;

    // Validate input
    if (!name || !country || !ingredients) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if the country is valid
    const isValidCountry = Object.values(countries).some(
      (c) => c.name.toLowerCase() === country.toLowerCase()
    );

    if (!isValidCountry) {
      return res.status(400).json({ message: 'Invalid country name' });
    }

    if (typeof ingredients === 'string') {
      try {
        ingredients = JSON.parse(ingredients); 
      } catch {
        ingredients = ingredients.split(',').map(s => s.trim()).filter(Boolean);
      }
    }

    const imagePath = req.file ? `uploads/foods/${req.file.filename}` : '';


    // Create new food item
    const newFood = new Food({
      name,
      country,
      ingredients,
      description: req.body.description || '',
      price: req.body.price || 0,
      image: imagePath,
      createdBy: req.user.id,
      category: req.body.category || 'main', // Default to 'main' if not provided
    });

    const publicImage = Food.image ? `${req.protocol}://${req.get('host')}/${Food.image}` : '';
    await newFood.save();
    res.status(201).json({
      message: 'Food created successfully',
      food: { ...newFood.toObject(), image: publicImage }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Food creation failed' });
  }
};

export const updateFoodImage = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    if (food.createdBy.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can only update your own foods' });
    }
    if (!req.file) return res.status(400).json({ message: 'No image sent' });

    if (food.image && food.image.startsWith('uploads/')) {
      const oldAbs = path.join(process.cwd(), food.image);
      if (fs.existsSync(oldAbs)) fs.unlink(oldAbs, () => {});
    }

    food.image = `uploads/foods/${req.file.filename}`;
    await food.save();

    const publicImage = `${req.protocol}://${req.get('host')}/${food.image}`;
    res.json({ message: 'Image updated', image: publicImage, foodId: food._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update image' });
  }
};

// GET /api/foods
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().populate('createdBy', 'name email');
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch foods' });
  }
};
// GET /api/foods/category/:category
export const getFoodsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const foods = await Food.find({ category });

    if (!foods.length) {
      return res.status(404).json({ message: 'No foods found in this category' });
    }

    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch foods by category' });
  }
};

// GET /api/foods/country/:countryName
export const getFoodsByCountry = async (req, res) => {
  const { countryName } = req.params;

  try {
    const foods = await Food.find({ country: { $regex: new RegExp(`^${countryName}$`, 'i') } });


    res.json(foods);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch foods by country' });
  }
};
