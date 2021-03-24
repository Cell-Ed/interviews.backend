import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    // email address used as username (required)
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // user's encrypted password (bcrypt hash)
    type: String,
    required: true,
  },
  family: {
    // user's family name (optional)
    type: String,
  },
  given: {
    // user's given name (optional)
    type: String,
  },
  active: {
    // user account status
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// match user's password using bcrypt
userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

const User = mongoose.model('user', userSchema, 'users');

export default User;
