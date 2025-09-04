import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// add item to cart – only for customer (POST /api/cart/add)
router.post('/add', authMiddleware, allowRoles('customer'), addToCart);

// Gets the user's cart – only for customer (GET /api/cart)
router.get('/', authMiddleware, allowRoles('customer'), getCart);

// removes item from cart – only for customer (DELETE /api/cart/:foodId)
router.delete('/:foodId', authMiddleware, allowRoles('customer'), removeFromCart);

router.put("/update", authMiddleware, allowRoles('customer'), updateQuantity); 

export default router;

