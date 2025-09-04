import express from "express";
import { getChefsByCuisine } from "../controllers/foodController.js";

const router = express.Router();

// GET /api/chefs?cuisineId=123
router.get("/", getChefsByCuisine);

export default router;
