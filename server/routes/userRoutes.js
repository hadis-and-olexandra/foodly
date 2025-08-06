import express from 'express';
import { authMiddleware} from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to your profile!',
    user: req.user, // User information from the token
  });
});

export default router;
