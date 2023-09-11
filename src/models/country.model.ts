
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Country {
  @prop({ required: true, trim: true, maxlength: 100 })
  name: string

  @prop({ required: true, trim: true, maxlength: 10 })
  alpha2: string

  @prop({ required: true, unique: true, trim: true, maxlength: 10 })
  countryCode: string
};

const CountryModel = getModelForClass(Country);
export default CountryModel;
