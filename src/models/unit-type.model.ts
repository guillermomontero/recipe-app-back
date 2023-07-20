import { prop, getModelForClass } from '@typegoose/typegoose';

export class UnitType {
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: 0 })
  value: number
};

const UnitTypeModel = getModelForClass(UnitType);
export default UnitTypeModel;