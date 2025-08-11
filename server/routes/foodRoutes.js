import express from 'express';
import { createFood,getFoods } from '../controllers/foodController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';



const router = express.Router();

// POST /api/foods
router.post('/', authMiddleware, allowRoles('chef'), createFood);
// GET /api/foods
// TODO: add optional query parameters for country
router.get('/', getFoods);

export default router;
