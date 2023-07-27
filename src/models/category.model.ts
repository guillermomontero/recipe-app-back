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
  @prop({ default: '', trim: true })
  name: string

  @prop({ default: 0 })
  value: number
};

const CategoryModel = getModelForClass(Category);
export default CategoryModel;