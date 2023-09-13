import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import SequenceModel from './sequence.model';

@pre<TemperatureCategory>('save', async function (next) {
  const doc = this as TemperatureCategory;
  const sequence = await SequenceModel.findOneAndUpdate(
    { name: 'temperaturecategories' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  doc.value = sequence.value;

  next();
})

// 0 - Not defined, 1 - Hot, 2 - Cold, 3 - Normal
class TemperatureCategory {
  @prop({ required: true, default: '', trim: true, maxlength: 50 })
  name: string

  @prop({ required: true, unique: true, default: 1 })
  value: number

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  createDate: Date
}

const TemperatureCategoryModel = getModelForClass(TemperatureCategory);
export default TemperatureCategoryModel;