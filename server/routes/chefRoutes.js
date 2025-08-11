import express from 'express';
import { getChefProfile,updateChefProfile,changeChefPassword} from '../controllers/chefController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile/:chefId', authMiddleware, allowRoles('chef'), getChefProfile);
router.put('/profile/:chefId', authMiddleware, allowRoles('chef'), updateChefProfile);
router.put('/profile/:chefId/password', authMiddleware, allowRoles('chef'), changeChefPassword);


export default router;
