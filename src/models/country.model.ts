
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Country {
  @prop({ required: true, trim: true, maxlength: 100 })
  name: string

  @prop({ required: true, trim: true, maxlength: 10 })
  alpha2: string

  @prop({ required: true, unique: true, trim: true, maxlength: 10 })
  countryCode: string

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  createDate: Date
};

const CountryModel = getModelForClass(Country);
export default CountryModel;
