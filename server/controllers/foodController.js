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

    // Create new food item
    const newFood = new Food({
      name,
      country,
      ingredients,
      description: req.body.description || '',
      price: req.body.price || 0,
      image: req.body.image || '',
      createdBy: req.user.id,
    });

    await newFood.save();

    res.status(201).json({ message: 'Food created successfully', food: newFood });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
