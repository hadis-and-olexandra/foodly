// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   foodItems: [
//     {
//       food: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Food',
//         required: true
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//         min: 1
//       }
//     }
//   ],
//   totalPrice: {
//     type: Number,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed'],
//     default: 'pending'
//   }
// }, { timestamps: true });

// const Order = mongoose.model('Order', orderSchema);
// export default Order;


import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodItems: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, 
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending" 
  },
  shippingAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  customerNote: { type: String, default: "" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
