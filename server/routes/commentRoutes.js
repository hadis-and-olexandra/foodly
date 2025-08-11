import express from 'express';
import { createComment, getCommentsByFood, deleteComment ,updateComment ,replyToComment,deleteReply,getCommentsWithReplies,updateReply } from '../controllers/commentController.js';
import { authMiddleware, allowRoles } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/comments
router.post('/', authMiddleware, allowRoles('customer'), createComment);

// GET /api/comments/:foodId
router.get('/:foodId', getCommentsByFood);

// DELETE /api/comments/:commentId
router.delete('/:commentId', authMiddleware, allowRoles('customer'), deleteComment);

// PUT /api/comments/:commentId
router.put('/:commentId', authMiddleware, allowRoles('customer'), updateComment);

// POST /api/comments/:commentId/reply
router.post('/:commentId/reply', authMiddleware, allowRoles('chef'), replyToComment);

// DELETE /api/comments/reply/:commentId
router.delete('/reply/:commentId', authMiddleware, allowRoles('chef'), deleteReply);

// GET /api/comments/with-replies/:foodId
router.get('/with-replies/:foodId', getCommentsWithReplies);

// PUT /api/comments/reply/:replyId
router.put('/reply/:replyId', authMiddleware, allowRoles('chef'), updateReply);

export default router;
