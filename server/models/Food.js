import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  country: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  averageRating: { 
    type: Number, 
    default: 0 
  },
  ratingsCount: { 
    type: Number, 
    default: 0 
  },
  image: {
    type: String, // URL to the image
    default: ''   // 
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);
export default Food;
