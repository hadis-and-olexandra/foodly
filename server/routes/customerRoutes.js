// server/routes/customerRoutes.js
import express from 'express';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';
import {
  getCustomerProfile,
  updateCustomerProfile,
  changeCustomerPassword,
} from '../controllers/customerController.js';

const router = express.Router();

router.get('/profile', authMiddleware, allowRoles('customer'), getCustomerProfile);
router.put('/profile', authMiddleware, allowRoles('customer'), updateCustomerProfile);
router.put('/profile/password', authMiddleware, allowRoles('customer'), changeCustomerPassword);

export default router;
