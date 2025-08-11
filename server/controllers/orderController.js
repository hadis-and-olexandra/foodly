import Order from '../models/Order.js';
import Food from '../models/Food.js';

export const createOrder = async (req, res) => {
  try {
    const { foodItems } = req.body;

    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
      return res.status(400).json({ message: 'No food items provided.' });
    }

    let totalPrice = 0;
    const validatedItems = [];

    for (const item of foodItems) {
      const food = await Food.findById(item.food);
      if (!food) {
        return res.status(404).json({ message: `Food item not found: ${item.food}` });
      }

      const quantity = Number(item.quantity) || 1;
      const itemPrice = Number(food.price) || 0;
      totalPrice += itemPrice * quantity;

      validatedItems.push({
        food: food.id,
        quantity
      });
    }
    console.log('req.user:', req.user);

    const order = new Order({
      user: req.user.id, 
      foodItems: validatedItems,
      totalPrice: totalPrice
    });

    await order.save();

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
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