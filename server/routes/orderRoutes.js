import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';


const router = express.Router();


router.post('/', authMiddleware, allowRoles('customer'), createOrder);
router.get('/', authMiddleware, allowRoles('customer'), getOrders);

export default router;
