import Order from '../models/Order.js';
import Cart from "../models/Cart.js";
import Food from '../models/Food.js';

// export const createOrder = async (req, res) => {
//   try {
//     const { foodItems } = req.body;

//     if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
//       return res.status(400).json({ message: 'No food items provided.' });
//     }

//     let totalPrice = 0;
//     const validatedItems = [];

//     for (const item of foodItems) {
//       const food = await Food.findById(item.food);
//       if (!food) {
//         return res.status(404).json({ message: `Food item not found: ${item.food}` });
//       }

//       const quantity = Number(item.quantity) || 1;
//       const itemPrice = Number(food.price) || 0;
//       totalPrice += itemPrice * quantity;

//       validatedItems.push({
//         food: food.id,
//         quantity
//       });
//     }
//     console.log('req.user:', req.user);

//     const order = new Order({
//       user: req.user.id, 
//       foodItems: validatedItems,
//       totalPrice: totalPrice
//     });

//     await order.save();

//     res.status(201).json({ message: 'Order created successfully', order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('foodItems.food', 'name price')
      .populate('user', 'name email');

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


export const createOrder = async (req, res) => {
  try {
    const customerId = req.user.id; // отримуємо з authMiddleware
    const { shippingAddress, paymentMethod, customerNote } = req.body;

    // Отримуємо товари з корзини
    const cart = await Cart.findOne({ user: customerId }).populate("items.food");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Формуємо масив foodItems для замовлення
    const foodItems = cart.items.map(item => ({
      food: item.food._id,
      name: item.food.name,
      quantity: item.quantity,
      price: item.food.price,
    }));

    // Обчислюємо загальну суму
    const totalPrice = foodItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Створюємо замовлення
    const order = new Order({
      customer: customerId,
      foodItems,
      totalPrice,
      shippingAddress,
      paymentMethod,
      customerNote: customerNote || "",
    });

    await order.save();

    // Очищаємо корзину після замовлення
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to place order" });
  }
};
