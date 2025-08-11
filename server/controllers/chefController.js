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
export const updateChefProfile = async (req, res) => {
  const { chefId } = req.params;
  const { name, phone, address } = req.body;

  const chef = await User.findById(chefId);
  if (!chef || chef.role !== 'chef') return res.status(404).json({ message: 'Chef not found' });

  if (name !== undefined) chef.name = name;
  if (phone !== undefined) chef.phone = phone;
  if (address !== undefined) chef.address = address;

  await chef.save();

  res.json({ message: 'Profile updated', chef: {
    _id: chef._id, name: chef.name, email: chef.email,
    role: chef.role, phone: chef.phone || '', address: chef.address || ''
  }});
};


export const changeChefPassword = async (req, res) => {
  try {
    const { chefId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'currentPassword and newPassword are required' });
    }

    const chef = await User.findById(chefId);
    if (!chef || chef.role !== 'chef') {
      return res.status(404).json({ message: 'Chef not found' });
    }

    const ok = await bcrypt.compare(currentPassword, chef.password);
    if (!ok) return res.status(400).json({ message: 'Current password is incorrect' });

    chef.password = await bcrypt.hash(newPassword, 10);
    await chef.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update password' });
  }
};
