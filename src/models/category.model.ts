import { pre, prop, getModelForClass } from '@typegoose/typegoose';
import SequenceModel from './sequence.model';

@pre<Category>('save', async function (next) {
  const doc = this as Category;
  const sequence = await SequenceModel.findOneAndUpdate(
    { name: 'categories' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  doc.value = sequence.value;

  next();
})

export class Category {
  @prop({ default: '', trim: true, required: true, maxlength: 50 })
  name: string

  @prop({ default: 0 })
  value: number

  @prop({ default: `${new Date().toISOString().split('T')[0]}T00:00:00.000+00:00` })
  createDate: Date
};

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
