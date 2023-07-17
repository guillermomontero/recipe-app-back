import { prop, getModelForClass } from '@typegoose/typegoose';

// 0 - Not defined, 1 - Hot, 2 - Cold, 3 - Normal
class TemperatureCategory {
  @prop()
  name: string

  @prop()
  value: number
}

const TemperatureCategoryModel = getModelForClass(TemperatureCategory);
export default TemperatureCategoryModel;