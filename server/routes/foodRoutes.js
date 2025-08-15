import express from 'express';
import { createFood,getFoods,getFoodsByCategory,updateFoodImage,getFoodsByCountry  } from '../controllers/foodController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';
import { uploadFoodImage } from '../middlewares/upload.js';


const router = express.Router();

// POST /api/foods
router.post('/', authMiddleware, allowRoles('chef'),uploadFoodImage.single('image'), createFood);
router.patch('/:id/image',authMiddleware,allowRoles('chef'),uploadFoodImage.single('image'),updateFoodImage);
// GET /api/foods
// TODO: add optional query parameters for country
router.get('/', getFoods);


router.get('/category/:category', getFoodsByCategory);
router.get('/country/:countryName', getFoodsByCountry);


export default router;
