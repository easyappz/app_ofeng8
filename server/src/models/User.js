const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
  {
    line1: { type: String, default: '' },
    line2: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    postalCode: { type: String, default: '' },
    country: { type: String, default: '' }
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    phone: { type: String, default: '' },
    address: { type: AddressSchema, default: () => ({}) }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id ? String(ret._id) : undefined;
    delete ret._id;
    delete ret.__v;
    delete ret.passwordHash;
    return ret;
  }
});

module.exports = mongoose.model('User', UserSchema);
