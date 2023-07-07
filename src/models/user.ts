
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Location } from './location';
import { Notification } from './notification';

enum Role {
  ADMIN = '1',
  USER = '2'
}

class User {
  @prop({ required: [true, 'Name is required'], trim: true })
  name: string

  @prop({ required: [true, 'Lastname is required'], trim: true })
  lastName: string

  @prop({ required: [true, 'Email is required'], unique: true, trim: true })
  email: string

  @prop({ required: [true, 'Phone is required'], default: null })
  telephone: number

  @prop({ default: Date.now })
  birthDate: Date

  @prop({ type: () => Location})
  location: Location

  @prop({ default: '' })
  imageProfile: string

  @prop({ default: false })
  premium: boolean

  @prop({ default: null })
  cardNumber: number

  @prop({ default: null })
  cardExpires: number

  @prop({ default: Date.now })
  entryDate: Date

  @prop({ default: Date.now })
  leavingDate: Date

  @prop({ default: Date.now })
  lastSession: Date

  @prop({ required: [true, 'You must enter a password']})
  password: string

  @prop({ enum: Role, default: 2 })
  role: Role

  @prop({ default: true })
  allowEmail: boolean

  @prop({ default: true })
  allowTerms: boolean

  @prop({ type: () => Notification })
  notifications: Notification

  @prop({ default: true })
  active: boolean
};

const UserModel = getModelForClass(User);
export default UserModel;
