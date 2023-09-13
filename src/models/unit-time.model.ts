import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import SequenceModel from './sequence.model';

@pre<UnitTime>('save', async function (next) {
  const doc = this as UnitTime;
  const sequence = await SequenceModel.findOneAndUpdate(
    { name: 'unittimes' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  doc.value = sequence.value;

  next();
})

export class UnitTime {
  @prop({ required: true, default: '', trim: true, maxlength: 50 })
  name: string

  @prop({ required: true, unique: true, default: 1 })
  value: number

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  createDate: Date
};

const UnitTimeModel = getModelForClass(UnitTime);
export default UnitTimeModel;