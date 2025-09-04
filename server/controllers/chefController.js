import User from '../models/User.js';
import Food from '../models/Food.js';
import Order from '../models/Order.js';
import bcrypt from 'bcrypt';

export const getChefProfile = async (req, res) => {
  try {
    const { chefId } = req.params;

    const chef = await User.findById(chefId).select('-password');
    if (!chef || chef.role !== 'chef') {
      return res.status(404).json({ message: 'Chef not found' });
    }

    const foods = await Food.find({ createdBy: chefId });

    const orders = await Order.find({ 'foodItems.food': { $in: foods.map(f => f._id) } });

    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);

    res.json({
      chef,
      foods,
      stats: {
        totalFoods: foods.length,
        totalOrders,
        completedOrders: completedOrders.length,
        totalRevenue
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

//
// export const updateChefProfile = async (req, res) => {
//   const { chefId } = req.params;
//   const { name, phone, address } = req.body;

//   const chef = await User.findById(chefId);
//   if (!chef || chef.role !== 'chef') return res.status(404).json({ message: 'Chef not found' });

//   if (name !== undefined) chef.name = name;
//   if (phone !== undefined) chef.phone = phone;
//   if (address !== undefined) chef.address = address;

//   await chef.save();

//   res.json({ message: 'Profile updated', chef: {
//     _id: chef._id, name: chef.name, email: chef.email,
//     role: chef.role, phone: chef.phone || '', address: chef.address || ''
//   }});
// };


// export const changeChefPassword = async (req, res) => {
//   try {
//     const { chefId } = req.params;
//     const { currentPassword, newPassword } = req.body;

//     if (!currentPassword || !newPassword) {
//       return res.status(400).json({ message: 'currentPassword and newPassword are required' });
//     }

//     const chef = await User.findById(chefId);
//     if (!chef || chef.role !== 'chef') {
//       return res.status(404).json({ message: 'Chef not found' });
//     }

//     const ok = await bcrypt.compare(currentPassword, chef.password);
//     if (!ok) return res.status(400).json({ message: 'Current password is incorrect' });

//     chef.password = await bcrypt.hash(newPassword, 10);
//     await chef.save();

//     res.json({ message: 'Password updated' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update password' });
//   }
// };

// GET /api/chef/profile
export const getOwnChefProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user || user.role !== "chef") {
      return res.status(404).json({ message: "Chef not found" });
    }

    res.json({
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load profile" });
  }
};

// PUT /api/chef/profile
export const updateChefProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'chef') {
      return res.status(404).json({ message: 'Chef not found' });
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (address !== undefined) user.address = address;

    await user.save();

    res.json({
      message: 'Profile updated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// PUT /api/chef/profile/password
export const changeChefPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || user.role !== 'chef') {
      return res.status(404).json({ message: 'Chef not found' });
    }

    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({
      message: 'Password updated',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update password' });
  }
};

// GET /api/chef/orders
export const getChefOrders = async (req, res) => {
  try {
    const chefId = req.user.id;

    // Отримуємо всі страви цього шефа
    const foods = await Food.find({ createdBy: chefId }).select("_id name price");

    const foodIds = foods.map(f => f._id);

    // Знаходимо всі замовлення, які містять ці страви
    const orders = await Order.find({ "foodItems.food": { $in: foodIds } })
      .populate("customer", "name email phone address")
      .sort({ createdAt: -1 });

    // Формуємо зручну структуру для фронтенду
    const formattedOrders = orders.map(order => ({
      id: order._id,
      date: order.createdAt,
      status: order.status,
      total: order.totalPrice,
      items: order.foodItems.reduce((sum, item) => sum + item.quantity, 0),
      customer: {
        name: order.customer.name,
        email: order.customer.email,
        phone: order.customer.phone,
        address: order.customer.address,
      },
      details: {
        products: order.foodItems.map(item => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
        })),
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        deliveryStatus: order.status,
        customerNote: order.customerNote,
      },
    }));

    res.json({ orders: formattedOrders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};