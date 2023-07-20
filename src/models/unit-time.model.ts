import { prop, getModelForClass } from '@typegoose/typegoose';

export class UnitTime {
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: 0 })
  value: number
};

const UnitTimeModel = getModelForClass(UnitTime);
export default UnitTimeModel;