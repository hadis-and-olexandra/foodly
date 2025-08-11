import Comment from '../models/Comment.js';
// POST /api/comments
// Create a new comment
// Only customers can create comments
export const createComment = async (req, res) => {
  try {
    const { foodId, text, rating } = req.body;
    const userId = req.user.id;

    const newComment = new Comment({
      food: foodId,
      user: userId,
      text,
      rating,
        parentComment: req.body.parentComment || null, // optional parent comment for replies
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
};
// GET /api/comments/:foodId
export const getCommentsByFood = async (req, res) => {
  try {
    const { foodId } = req.params;

    const comments = await Comment.find({ food: foodId }).populate('user', 'name');

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
};
// DELETE /api/comments/:commentId
// Only the user who created the comment can delete it
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You can only delete your own comments' });
    }
    if (!comment.parentComment) {
      await Comment.deleteMany({ parentComment: commentId });
    }
    await comment.deleteOne();
    res.json({ message: 'Comment and its replies deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

// PUT /api/comments/:commentId
// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text, rating } = req.body;
    const userId = req.user.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You can only edit your own comments' });
    }

    // Optional update (only if sent)
    if (text) comment.text = text;
    if (rating) comment.rating = rating;

    await comment.save();

    res.json({ message: 'Comment updated successfully', comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

// POST /api/comments/:commentId/reply
// Reply to a comment

export const replyToComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;
    const parent = await Comment.findById(commentId);
    if (!parent) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }

    const reply = new Comment({
      food: parent.food,
      user: userId,
      text,
      rating: 5, // optional or default
      parentComment: commentId,
    });

    await reply.save();

    res.status(201).json({ message: 'Reply added successfully', reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add reply' });
  }
};

// DELETE /api/comments/reply/:commentId
// Delete a reply
export const deleteReply = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    console.log('Deleting reply with ID:', commentId);
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (!comment.parentComment) {
      return res.status(400).json({ message: 'This is not a reply comment' });
    }

    if (req.user.role !== 'chef' || comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied: only the author chef can delete this reply' });
    }


    await comment.deleteOne();
    res.json({ message: 'Reply deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete reply' });
  }
};


// GET /api/comments/:foodId/replies
// Get comments with their replies for a specific food item
export const getCommentsWithReplies = async (req, res) => {
  try {
    const { foodId } = req.params;

    // get main comments for the food item
    const mainComments = await Comment.find({
      food: foodId,
      parentComment: null,
    }).populate('user', 'name');

    // get the IDs of the main comments  
    const commentIds = mainComments.map((c) => c._id);

    // get replies for those main comments
    const replies = await Comment.find({
      parentComment: { $in: commentIds },
    }).populate('user', 'name');
    // group replies by parent comment ID

    const repliesGrouped = {};
    for (const reply of replies) {
      const parentId = reply.parentComment.toString();
      if (!repliesGrouped[parentId]) {
        repliesGrouped[parentId] = [];
      }
      repliesGrouped[parentId].push(reply);
    }

    // combine main comments with their replies
    const commentsWithReplies = mainComments.map((comment) => {
      return {
        ...comment.toObject(),
        replies: repliesGrouped[comment._id.toString()] || [],
      };
    });

    res.json(commentsWithReplies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch comments with replies' });
  }
};

// PUT /api/comments/reply/:replyId
// Update a reply
export const updateReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    const reply = await Comment.findById(replyId);

    if (!reply) {
      return res.status(404).json({ message: 'Reply not found' });
    }

    if (!reply.parentComment) {
      return res.status(400).json({ message: 'This comment is not a reply' });
    }

   
    if (req.user.role !== 'chef' || reply.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Access denied: only the chef who posted the reply can edit it' });
    }

    reply.text = text;
    await reply.save();

    res.json({ message: 'Reply updated successfully', reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update reply' });
  }
};



