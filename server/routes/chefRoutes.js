import express from 'express';
import { getChefProfile,getOwnChefProfile, updateChefProfile,changeChefPassword, getChefOrders} from '../controllers/chefController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile/:chefId', authMiddleware, allowRoles('chef'), getChefProfile);
// router.put('/profile/:chefId', authMiddleware, allowRoles('chef'), updateChefProfile);
// router.put('/profile/:chefId/password', authMiddleware, allowRoles('chef'), changeChefPassword);

router.get('/profile', authMiddleware, allowRoles('chef'), getOwnChefProfile);
router.put('/profile', authMiddleware, allowRoles('chef'), updateChefProfile);
router.put('/profile/password', authMiddleware, allowRoles('chef'), changeChefPassword);
router.get("/orders", authMiddleware, allowRoles("chef"), getChefOrders);

export default router;
