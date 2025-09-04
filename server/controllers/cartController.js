import Cart from '../models/Cart.js';

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const itemIndex = cart.items.findIndex(i => i.food.toString() === foodId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += 1;
    } else {
      cart.items.push({ food: foodId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.food');
    res.status(200).json(cart || { items: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(i => i.food.toString() !== foodId);
    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove item from cart' });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    let cart = await Cart.findOne({ user: userId }).populate('items.food');
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex((i) => i.food._id.toString() === foodId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ items: cart.items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update quantity" });
  }
};
