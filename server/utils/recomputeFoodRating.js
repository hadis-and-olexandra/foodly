import mongoose from 'mongoose';
import Comment from '../models/Comment.js';
import Food from '../models/Food.js';

export const recomputeFoodRating = async (foodId) => {
  const [result] = await Comment.aggregate([
    {
      $match: {
        food: new mongoose.Types.ObjectId(foodId),
        parentComment: null,
        rating: { $gte: 1 }
      }
    },
    {
      $group: {
        _id: null,
        avg: { $avg: '$rating' },
        count: { $sum: 1 }
      }
    }
  ]);

  const averageRating = result?.avg ? Number(result.avg.toFixed(2)) : 0;
  const ratingsCount  = result?.count || 0;

  await Food.findByIdAndUpdate(
    foodId,
    { averageRating, ratingsCount },
    { new: true }
  );
};
