
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Location } from './location.model';
import { Notification } from './notification.model';

enum Role {
  ADMIN = 1,
  USER = 2
}

export class User {
  @prop({ required: [true, 'Name is required'], trim: true, maxlength: 50 })
  name: string

  @prop({ required: [true, 'nickname is required'], trim: true, maxlength: 50, unique: true })
  nickname: string

  @prop({ required: [true, 'Lastname is required'], trim: true, maxlength: 100 })
  lastName: string

  @prop({ required: [true, 'Email is required'], unique: true, trim: true, maxlength: 150 })
  email: string

  @prop({ default: null })
  telephone: number

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  birthday: Date

  @prop({ type: () => Location})
  location: Location

  @prop({ default: '', maxlength: 200 })
  imageProfile: string

  @prop({ default: false, required: true })
  premium: boolean

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  createDate: Date

  @prop({ default: Date.now })
  createTime: Date

  @prop({ default: Date.now })
  leavingDate: Date

  @prop({ default: Date.now })
  lastSession: Date

  @prop({ required: [true, 'You must enter a password'], maxlength: 1000})
  password: string

  @prop({ enum: Role, default: 2, required: true })
  role: Role

  @prop({ default: true })
  allowEmail: boolean

  @prop({ default: true })
  allowTerms: boolean

  @prop({ type: () => Notification })
  notifications: Notification

  @prop({ type: String, default: () => [] })
  favorites: string[]

  @prop({ default: true })
  active: boolean
};

const UserModel = getModelForClass(User);
export default UserModel;
