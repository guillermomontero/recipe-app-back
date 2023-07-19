
import { prop, getModelForClass } from '@typegoose/typegoose';

export class Country {
  @prop({ required: true, trim: true })
  name: string

  @prop({ required: true, trim: true })
  alpha2: string

  @prop({ required: true, unique: true, trim: true })
  countryCode: string
};

const CountryModel = getModelForClass(Country);
export default CountryModel;
