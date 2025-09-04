import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Order from '../models/Order.js';

// GET /api/customers/profile
export const getCustomerProfile = async (req, res) => {
  try {
    const customer = await User.findById(req.user.id).select('-password');
    if (!customer || customer.role !== 'customer') {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('foodItems.food', 'name price image');

    res.json({
      user: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        address: customer.address || '',
        role: customer.role,
      },
      orders: orders.map(o => ({
        id: o._id,
        status: o.status,          // 'pending' | 'completed'
        date: o.createdAt,
        totalPrice: o.totalPrice,
        items: o.foodItems.map(it => ({
          foodId: it.food?._id,
          foodName: it.food?.name,
          price: it.food?.price,
          quantity: it.quantity,
          image: it.food?.image || '',
        }))
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch customer profile' });
  }
};

// PUT /api/customers/profile
export const updateCustomerProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'customer') {
      return res.status(404).json({ message: 'Customer not found' });
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

// PUT /api/customers/profile/password
export const changeCustomerPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'customer') {
      return res.status(404).json({ message: 'Customer not found' });
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

// export const changeCustomerPassword = async (req, res) => {
//   try {
//     const { currentPassword, newPassword } = req.body;
//     const user = await User.findById(req.user.id);
//     if (!user || user.role !== 'customer') {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     const ok = await bcrypt.compare(currentPassword, user.password);
//     if (!ok) return res.status(400).json({ message: 'Current password is incorrect' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     res.json({ message: 'Password updated' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to update password' });
//   }
// };
