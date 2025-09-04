import Country from '../models/Country.js';

// Get all cuisines (countries)
export const getAllCuisines = async (req, res) => {
  try {
    const countries = await Country.find().select("name"); // only return "name" field
    res.json(countries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch cuisines" });
  }
};
