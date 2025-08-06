import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true }
});

export default mongoose.model('Country', countrySchema);
