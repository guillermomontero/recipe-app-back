
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Location } from './location.model';
import { Notification } from './notification.model';

enum Role {
  ADMIN = 1,
  USER = 2
}

export class User {
  @prop({ required: [true, 'Name is required'], trim: true })
  name: string

  @prop({ required: [true, 'nickname is required'], trim: true })
  nickname: string

  @prop({ required: [true, 'Lastname is required'], trim: true })
  lastName: string

  @prop({ required: [true, 'Email is required'], unique: true, trim: true })
  email: string

  @prop({ default: null })
  telephone: number

  @prop({ default: Date.now })
  birthDate: Date

  @prop({ type: () => Location})
  location: Location

  @prop({ default: 'https://www.adobe.com/content/dam/cc/us/en/creativecloud/photography/discover/portrait-photography/CODERED_B1_portrait_photography-P4a_438x447.jpg.img.jpg' })
  imageProfile: string

  @prop({ default: false })
  premium: boolean

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

  @prop({ default: [] })
  favourites: string[]

  @prop({ default: true })
  active: boolean
};

const UserModel = getModelForClass(User);
export default UserModel;
