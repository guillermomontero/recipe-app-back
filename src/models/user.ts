import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const roles = {
  values: ['ADMIN', 'USER'],
  message: '{VALUE} - The role is not valid'
}

const userSchema = new Schema({
  name: { type: String, required: [true, 'Username is required'] },
  lastName: { type: String, required: [true, 'Lastname is required'], default: '' },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  telephone: { type: Number, required: [true, 'Phone is required'], default: null },
  birthDate: { type: Date, default: Date.now },
  location: {
    adress: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    zipcode: { type: Number, default: 10000 }
  },
  imageProfile: { type: String, default: '' },
  premium: { type: Boolean, default: false },
  cardNumber: { type: Number, default: null },
  cardExpires: { type: Number, default: null },
  entryDate: { type: Date, default: Date.now },
  leavingDate: { type: Date, default: Date.now },
  lastSession: { type: Date, default: Date.now },
  password: { type: String, required: [true, 'You must enter a password']},
  role: { type: String, default: 'USER', enum: roles },
  allowEmail: { type: Boolean, default: true },
  allowTerms: { type: Boolean, default: true },
  notifications: {
    notifications: { type: Boolean, default: false },
    notifyVersion: { type: Boolean, default: false },
  },
  active: { type: Boolean, default: true }
})

userSchema.plugin(uniqueValidator, { message: 'Error, the {PATH} is already registered' });

userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Convert to model
// Convert to model
export default model('User', userSchema);